// coding=utf-8

import { post } from "../tools/request.js";

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

export async function embeddings(req, res) {
    if(!req.headers.authorization) {
        res.status(401).send("Not Authorized!");
        return;
    }

    const { input } = req.body;
    if(!input) {
        res.status(400).send("Input sentence not specified!");
    }

    const { embedding, http_error } = await post('embedding', {body: {
        content: input
    }}, { eng: "embedding" });

    if(http_error) {
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