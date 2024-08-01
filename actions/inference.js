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

import { formatOpenAIContext } from "../tools/formatContext.js";
import { generateFingerprint } from "../tools/generator.js";
import { post } from "../tools/request.js";

function generateResponseContent(id, object, model, system_fingerprint, stream, content, stopped) {
    const resp = {
        id,
        object,
        created: Date.now(),
        model,
        system_fingerprint,
        choices: [{
            index: 0,
            [stream ? 'delta':'message']: {
                role: 'assistant',
                content
            },
            logprobs: null,
            finish_reason: stopped ? 'stop' : null
        }],
    }
    if(!stream) {
        resp.usage = {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0
        }
    }
    return resp;
}

const default_stop_keywords = ['### user:']

export async function chatCompletion(req, res) {
    const api_key = (req.headers.authorization || '').split('Bearer ').pop();
    if(!api_key) {
        res.status(401).send('Not Authorized');
        return;
    }

    let {messages, max_tokens, ...request_body} = req.body;

    // format requests to llamacpp format input
    request_body.prompt = formatOpenAIContext(messages);
    if(max_tokens) request_body.n_predict = max_tokens;
    if(!request_body.stop) request_body.stop = [...default_stop_keywords];

    // extra
    const system_fingerprint = generateFingerprint();
    const model = request_body.model || process.env.LANGUAGE_MODEL_NAME

    if(request_body.stream) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("X-Accel-Buffering", "no");
        res.setHeader("Connection", "Keep-Alive");
        
        const eng_resp = await post('completion', { body: request_body }, { getJSON: false });
        const reader = eng_resp.body.pipeThrough(new TextDecoderStream()).getReader();
        while(true) {
            const { value, done } = await reader.read();
            if(done) break;
            const data = value.split("data: ").pop()
            const json_data = JSON.parse(data)
            const { content, stop } = json_data;
            res.write(JSON.stringify(generateResponseContent(api_key, 'chat.completion.chunk', model, system_fingerprint, true, content, stop))+'\n\n');
        }
        res.end();
    } else {
        const eng_resp = await post('completion', { body: request_body });
        const { model, content } = eng_resp;
        const response_json = generateResponseContent(
            api_key, 'chat.completion', model, system_fingerprint,
            false, content, true
        )
        res.send(response_json);
    }
}