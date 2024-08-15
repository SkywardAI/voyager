// coding=utf-8

// Copyright [2024] [SkywardAI]
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { calculateEmbedding } from "../actions/embedding.js";
import { get } from "../tools/request.js";
import { getTable } from "./index.js";
import { DATASET_TABLE, SYSTEM_TABLE } from "./types.js";

/**
 * @typedef DatasetStructure
 * @property {String} context This is the context for AI to reference, been added into system instruction
 * @property {String} identifier Identifier for the column, not necessarily unique
 * @property {Float[]} vector Embedding from embedding engine, can get from calculateEmbedding();
 */

/**
 * Get a dataset from url
 * @param {String} dataset_url 
 * the url of dataset going to load, which is a json in the format of\
 * `{..., rows: [{ identifier: "", context: "", embedding: [...] },...]}`
 * @returns {Promise<DatasetStructure[]>} the dataset in {@link DatasetStructure}
 */
export async function getDatasetFromURL(dataset_url) {
    const { rows, http_error } = await get('', {}, {URL: dataset_url});
    if(http_error) return [];

    return rows.map(({identifier, context, embedding})=>{
        return { identifier, context, vector: embedding }
    })
}

/**
 * Load a given dataset into database.
 * If `force` specified, it will load the dataset without check whether it is already in system.
 * @param {String} dataset_name The dataset name to load
 * @param {Boolean} force Specify whether to force load the dataset, default `false`.
 * @returns {Promise<Promise>} A function takes a dataset array, which should in the format of `[{identifier:"",context:"",vector:[...]}]`
 * 
 * @example
 * const loader = await loadDataset("<your-dataset-name>");
 * const dataset = await getDatasetFromURL("<your-dataset-url>");
 * await loader(dataset);
 */
export async function loadDataset(dataset_name, force = false) {
    const system_table = await getTable(SYSTEM_TABLE);
    const dataset_table = await getTable(DATASET_TABLE);

    const dataset_loaded = !!await system_table.query()
    .where(`title="loaded_dataset_name" AND value="${dataset_name}"`).toArray().length;

    return async function(dataset) {
        if(!dataset_loaded || force) {
            await dataset_table.add(dataset.map(({identifier, context, vector})=>{
                return { identifier, context, vector, dataset_name }
            }))
        }

        if(!dataset_loaded) {
            await system_table.add([{title: "loaded_dataset_name", value: dataset_name}])
        }
    }
}

/**
 * @typedef EmbeddingSearchResult
 * @property {String} identifier The identifier from dataset
 * @property {String} context The context from dataset
 * @property {Number} _distance The distance of this result, generated by database algorithm
 */

/**
 * Search in given dataset using provided embedding value to get Q/A pair
 * @param {String} dataset_name The dataset name to be query from
 * @param {Array<Float>} vector The embedding result to be searched
 * @param {Number} max_distance If the calculated distance is over given max_distance, then the result will be excluded.  
 * Default to `0.8`.
 * @param {Integer} max_results Maximum `max_results` results will be returned.\
 * If set to `1`, This function will return an instance of {@link EmbeddingSearchResult},\
 * Otherwise will return an array of {@link EmbeddingSearchResult}
 * @returns {Promise<EmbeddingSearchResult|EmbeddingSearchResult[]|null>} If there's no result, returns null, otherwise returns the result
 */
export async function searchByEmbedding(dataset_name, vector, max_distance = 0.8, max_results = 1) {
    const embedding_result = (await (
        await getTable(DATASET_TABLE)
    ).search(vector).distanceType("cosine").where(`dataset_name = "${dataset_name}"`)
    .limit(max_results).toArray());

    if(embedding_result) {
        if(max_results === 1) {
            const { identifier, context, _distance } = embedding_result.pop();
            if(_distance >= max_distance) return null;
            return { identifier, context, _distance }
        } else {
            const results = [];
            for(const result of embedding_result) {
                const { identifier, context, _distance } = result;
                if(_distance >= max_distance) break;
                results.push({ identifier, context, _distance })
            }
            return results;
        }
    }
    return null;
}

/**
 * Search in given dataset using provided message to get Q/A pair.  
 * This will firstly embedding the message and query use {@link searchByEmbedding}
 * @param {String} dataset_name The dataset name to be query from
 * @param {String} message The message to be searched
 * @param {Number} max_distance If the calculated distance is over given max_distance, then the result will be excluded.  
 * Default to `1`.
 * @param {Integer} max_results Maximum `max_results` results will be returned.\
 * If set to `1`, This function will return an instance of {@link EmbeddingSearchResult},\
 * Otherwise will return an array of {@link EmbeddingSearchResult}
 * @returns {Promise<EmbeddingSearchResult|EmbeddingSearchResult[]|null>} If there's no result, returns null, otherwise returns the result
 */
export async function searchByMessage(dataset_name, message, max_distance = 0.8, max_results = 1) {
    const embedding = calculateEmbedding(message);

    if(embedding) return await searchByEmbedding(dataset_name, embedding, max_distance, max_results);
    return null;
}