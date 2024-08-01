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

const system_context = "A chat between a curious human and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the human's questions."

export function formatInferenceContext(history, question) {
    let context = system_context;
    context += history.map(({role, message}) => {
        return `### ${role === 'user' ? 'Human' : 'Assistant'}: ${message || ''}`
    }).join('\n');
    context += `\n### Human: ${question}\n### Assistant:`;
    return context;
}

export function formatOpenAIContext(messages) {
    let context = messages.map(({role, content}) => {
        return `### ${role}: ${content}`;
    }).join("\n");
    context += '\n### assistant:'
    return context;
}