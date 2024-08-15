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

/**
 * @typedef OpenAIMessageObject
 * @property {"user"|"system"|"assistant"} role The role who sent `content`
 * @property {String} content The content sent by `role`
 */

/**
 * @typedef VectorSearchResult
 * @property {"user"|"system"|"assistant"} role The role who sent `content`
 * @property {String} content The content sent by `role`
 */

/**
 * @typedef MessageHandlerParams
 * @property {String} message The last content in message history where `role="user"`
 * @property {OpenAIMessageObject[]} full_hisoty The full list of messages in request body
 */

/**
 * @typedef MessageHandlerReturns
 * @property {"error"|"replace_resp"|"system_instruction"|"history"|"normal"} type The type of returned value
 * @property {any} value The return value of your selected return type
 */

/**
 * Handle user messages by using params, only /v1/chat/completions support handle messages.\
 * **Note:**: If environmental variable ENABLE_PLUGIN set to `0`, this function will not be called.\
 * \
 * If return `type` is `error`, the inference API will reject the request by status 403 and send `value` as message.\
 * If return `type` is `replace_resp`, the inference API will send response use the `value` instead of ask ai inference.\
 * If return `type` is `system_instruction`, the inference API will add `value` to original message list.\
 * If return `type` is `history`, the inference API will use `value` as message list instead of the original messages.\
 * If return `type` is `normal`, the inference API will do everything normally.
 * @param {MessageHandlerParams} params The params sent from inference routes
 * @returns {Promise<MessageHandlerReturns>}
 */
export async function userMessageHandler(params) {
    // =============================================
    //   remove this section & add your own code
    params
    return { type: "normal" }
    // =============================================
}

/**
 * @typedef DatasetStructure
 * @property {String} context This is the context for AI to reference, been added into system instruction
 * @property {String} identifier Identifier for the column, not necessarily unique
 * @property {Float[]} vector Embedding from embedding engine, can get from calculateEmbedding();
 */

/**
 * Returns the default dataset, will be called when: database loaded AND (database is force load OR the default data is not loaded)
 * @returns {Promise<DatasetStructure[]>}
 */
export async function loadDefaultDataset() {
    // Add your own code here
    return [];
}