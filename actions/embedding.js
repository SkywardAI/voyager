// coding=utf-8

import { post } from "../tools/request.js";
import { extractAPIKeyFromRequest, validateAPIKey } from "../tools/apiKey.js";
import { getDatasetFromURL, loadDataset, parseDatasetWithoutVector } from "../database/rag-inference.js";

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

export async function calculateEmbedding(content) {
    const { embedding, http_error } = await post('embedding', {body: {
        content
    }}, { eng: "embedding" });

    if(!http_error) return embedding;
    else return null;
}

export async function embeddings(req, res) {
    if(!validateAPIKey(extractAPIKeyFromRequest(req))) {
        res.status(401).send("Not Authorized!");
        return;
    }

    const { input } = req.body;
    if(!input) {
        res.status(400).send("Input sentence not specified!");
    }

    const embedding = await calculateEmbedding(input);

    if(!embedding) {
        res.status(500).send("Embedding Engine Internal Server Error")
        return;
    }

    res.status(200).send({
        object: "list",
        data: [
            {
                object: "embedding",
                embedding,
                index: 0
            }
        ],
        model: "all-MiniLM-L6-v2",
        usage: {
            prompt_tokens: 0,
            total_tokens: 0
        }
    })
}

/**
 * function for upload dataset
 * @param {Request} req 
 * @param {Response} res 
 */
export async function uploadDataset(req, res) {
    if(!validateAPIKey(extractAPIKeyFromRequest(req))) {
        res.status(401).send("Not Authorized!");
        return;
    }

    const { name, json, url, force, keep_records } = req.body;
    if(!name || (!json && !url)) {
        res.status(422).send("Please specify dataset name and one choice of json / url.");
        return;
    }

    const loader = await loadDataset(name, force);
    if(loader) {
        try {
            const dataset = url ? 
                await getDatasetFromURL(url) : 
                await parseDatasetWithoutVector(json);

            await loader(dataset, force && keep_records);
        } catch(error) {
            res.status(500).send(error.message)
        }
    }

    res.status(200).send("Dataset loaded");
}