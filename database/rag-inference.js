import { get, post } from "../tools/request.js";
import { getTable } from "./index.js";
import { DATASET_TABLE, SYSTEM_TABLE } from "./types.js";

async function loadDatasetFromURL(dataset_name, dataset_url, system_table) {
    system_table = system_table || await getTable(SYSTEM_TABLE);
    const { rows, http_error } = await get('', {}, {URL: dataset_url});
    if(http_error) return false;
    
    await system_table.add([{ title: "loaded_dataset_name", value: dataset_name }]);

    await (await getTable(DATASET_TABLE)).add(rows.map(({row})=>{
        const { question, answer, question_embedding } = row;
        return { question, answer, vector: question_embedding, dataset_name }
    }))
    return true;
}

/**
 * Load a dataset from given url.  
 * * This will first check whether the dataset is loaded in database, if `force` not provided and it's loaded already, it won't load again.
 * * The dataset format should be an array of object contains at least `question`, `answer` and `question_embedding` properties
 * @param {String} dataset_name The dataset name to load
 * @param {String} dataset_url The url of dataset to load
 * @param {Boolean} force Specify whether to force load the dataset, default `false`.
 * @returns {Promise<Boolean>} If cannot get the dataset, return `false`, otherwise return `true`
 */
export async function loadDataset(dataset_name, dataset_url, force = false) {
    const system_table = await getTable(SYSTEM_TABLE)
    if(!force) {
        const loaded_dataset = await system_table.query()
        .where(`title="loaded_dataset_name" AND value="${dataset_name}"`).toArray();
        // check if the given dataset loaded, if not, load the dataset
        return !!(loaded_dataset.length || await loadDatasetFromURL(dataset_name, dataset_url, system_table))
    } else {
        return await loadDatasetFromURL(dataset_name, dataset_url, system_table)
    }
}

/**
 * @typedef EmbeddingSearchResult
 * @property {String} question The question from dataset
 * @property {String} answer The answer from dataset
 */

/**
 * Search in given dataset using provided embedding value to get Q/A pair
 * @param {String} dataset_name The dataset name to be query from
 * @param {Array<Float>} vector The embedding result to be searched
 * @returns {Promise<EmbeddingSearchResult|null>} If there's no result, returns null, otherwise returns the result
 */
export async function searchByEmbedding(dataset_name, vector) {
    const embedding_result = (await (
        await getTable(DATASET_TABLE)
    ).search(vector).where(`dataset_name = "${dataset_name}"`)
    .limit(1).toArray()).pop();

    if(embedding_result) {
        const { question, answer, _distance } = embedding_result;
        return { question, answer, _distance }
    }
    return null;
}

/**
 * Search in given dataset using provided message to get Q/A pair.  
 * This will firstly embedding the message and query use {@link searchByEmbedding}
 * @param {String} dataset_name The dataset name to be query from
 * @param {String} message The message to be searched
 * @returns {Promise<EmbeddingSearchResult|null>} If there's no result, returns null, otherwise returns the result
 */
export async function searchByMessage(dataset_name, message) {
    const { embedding, http_error } = await post('embedding', {body: {
        content: message
    }}, { eng: "embedding" });

    return http_error ? null : await searchByEmbedding(dataset_name, embedding);
}