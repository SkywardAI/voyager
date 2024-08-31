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
import { searchByMessage } from "../database/rag-inference.js";
import { userMessageHandler } from "../tools/plugin.js";
import { extractAPIKeyFromHeader, validateAPIKey } from "../tools/apiKey.js";

/**
 * Generates a response content object for chat completion.
 *
 * @param {string} id - The unique identifier for the response.
 * @param {string} object - The type of the response object (e.g., 'chat.completion').
 * @param {string} model - The model used for generating the response.
 * @param {string} system_fingerprint - The system fingerprint used to identify the current system state.
 * @param {boolean} stream - Indicates whether the response is streamed or not.
 * @param {string} content - The generated content for the response.
 * @param {boolean} stopped - Indicates if the response generation was stopped.
 * @returns {Object} The response content object.
 */
function generateResponseContent(
  id,
  object,
  model,
  system_fingerprint,
  stream,
  content,
  stopped
) {
  const resp = {
    id,
    object,
    created: Date.now(),
    model,
    system_fingerprint,
    choices: [
      {
        index: 0,
        [stream ? "delta" : "message"]: {
          role: "assistant",
          content,
        },
        logprobs: null,
        finish_reason: stopped ? "stop" : null,
      },
    ],
  };
  if (!stream) {
    resp.usage = {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
    };
  }
  return resp;
}

/**
 * Post to inference engine
 * @param {Object} req_body The request body to be sent
 * @param {Function} callback Callback function, takes one parameter contains parsed response json 
 * @param {Boolean} isStream To set the callback behaviour
 */
async function doInference(req_body, callback, isStream) {
    if(isStream) {
        const eng_resp = await post('completion', { body: req_body }, { getJSON: false });
        const reader = eng_resp.body.pipeThrough(new TextDecoderStream()).getReader();
        while(true) {
            const { value, done } = await reader.read();
            if(done) break;
            const data = value.split("data: ").pop()
            try {
                callback(JSON.parse(data));
            } catch(error) {
                console.log(error)
                callback({content: "", stop: true})
            }
        }
    } else {
        const eng_resp = await post('completion', { body: req_body });
        if(eng_resp.http_error) return;
        callback(eng_resp);
    }
}

function retrieveData(req_header, req_body) {
    // retrieve api key
    const api_key = extractAPIKeyFromHeader(req_header);
    if(!validateAPIKey(api_key)) {
        return { error: true, status: 401, message: "Not Authorized" }
    }

    // get attributes required special consideration
    let { messages, max_tokens, ...request_body } = req_body;

    // validate messages
    if(!messages || !messages.length) {
        return { error: true, status: 422, message: "Messages not given!" }
    }

    // apply n_predict value
    if(!max_tokens) max_tokens = 128;
    request_body.n_predict = max_tokens;

    // apply stop value
    if(!req_body.stop) request_body.stop = [...default_stop_keywords];

    // generated fields
    const system_fingerprint = generateFingerprint();
    const model = request_body.model || process.env.LANGUAGE_MODEL_NAME


    return { error: false, body: {request_body, messages, api_key, system_fingerprint, model} }

}

const default_stop_keywords = ["<|endoftext|>", "<|end|>", "<|user|>", "<|assistant|>"]

/**
 * Handles a chat completion request, generating a response based on the input messages.
 *
 * @async
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
export async function chatCompletion(req, res) {
    const {error, body, status, message} = retrieveData(req.headers, req.body);
    if(error) {
        res.status(status).send(message);
        return;
    }

    const { api_key, model, system_fingerprint, request_body, messages } = body
    const isStream = !!request_body.stream;

    if(+process.env.ENABLE_PLUGIN) {
        const latest_message = messages.filter(e=>e.role === 'user').pop()
        const { type, value } = await userMessageHandler({
            "message": latest_message ? latest_message.content : "",
            "full_hisoty": messages
        });

        switch(type) {
            case "error":
                res.status(403).send(value);
                return;
            case "replace_resp":
                res.send(generateResponseContent(
                    api_key, 'chat.completion', model, system_fingerprint,
                    isStream, value, true
                ));
                return;
            case "history":
                request_body.prompt = formatOpenAIContext(value);
                break;
            case "system_instruction":
                messages.push({role:"system", content: value});
                break;
            case "normal": default:
                break;
        }
    }

    if(!request_body.prompt) {
        request_body.prompt = formatOpenAIContext(messages);
    }

    if(isStream) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("X-Accel-Buffering", "no");
        res.setHeader("Connection", "Keep-Alive");
    }
    doInference(request_body, (data) => {
        const { content, stop } = data;
        if(isStream) {
            res.write(JSON.stringify(
                generateResponseContent(
                    api_key, 'chat.completion.chunk', model, system_fingerprint, isStream, content, stop
                )
            )+'\n\n');
            if(stop) res.end();
        } else {
            res.send(generateResponseContent(
                api_key, 'chat.completion', model, system_fingerprint,
                isStream, content, true
            ))
        }
    }, isStream)
}
    
/**
 * Handles a RAG-based (Retrieval-Augmented Generation) chat completion request.
 *
 * @async
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
export async function ragChatCompletion(req, res) {
    const {error, body, status, message} = retrieveData(req.headers, req.body);
    if(error) {
        res.status(status).send(message);
        return;
    }
    const { dataset_name, ...request_body } = body.request_body;
    if(!dataset_name) {
        res.status(422).send("Dataset name not specified.");
    }
    const { api_key, model, system_fingerprint, messages } = body

    const latest_message = messages.slice(-1)[0].content;
    const rag_result = await searchByMessage(dataset_name, latest_message);

    const context = [...messages];
    if(rag_result) context.push({ 
        role: "system", 
        content: `This background information is useful for your next answer: "${rag_result.context}"` 
    })
    request_body.prompt = formatOpenAIContext(context);

    const isStream = !!request_body.stream;
    if(isStream) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("X-Accel-Buffering", "no");
        res.setHeader("Connection", "Keep-Alive");
    }
    doInference(request_body, (data) => {
        const { content, stop } = data;
        const openai_response = generateResponseContent(
            api_key, 'chat.completion.chunk', model, system_fingerprint, true, content, stop
        )
        const rag_response = stop ? { content: openai_response, rag_context: rag_result } : openai_response;

        if(isStream) {
            res.write(JSON.stringify(rag_response)+'\n\n');
            if(stop) res.end();
        } else {
            res.send(rag_response);
        }
    }, isStream)
}
