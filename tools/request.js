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

const BASE_URL = {
    "chat": `http://${process.env.INFERENCE_ENG || 'llamacpp'}:${process.env.ENG_ACCESS_PORT || 8080}`,
    "embedding": `http://${process.env.EMBEDDING_ENG || 'embedding_eng'}:${process.env.ENG_ACCESS_PORT || 8080}`
}

const default_options = {
    headers: {
        'Content-Type': 'application/json'
    }
}

/**
 * @typedef RequestOptions
 * @property {"embedding"|"chat"} eng select between embedding engine or chat engine, default value is `chat`
 * @property {Boolean} getJSON  
 *  * If set to `true`, this function will return the result of `await(await fetch(...)).json();`
 *  and include an attribute `http_error: true` if there's any http error occurs during fetch().  
 *  * If set to `false`, this function will return the result of `await fetch(...);`, without error handling
 *  * default value is `true`;
 * @property {String} URL specify the url of request instead of generated use base route
 */

/**
 * A wrap of native fetch api helps fill default headers and urls
 * @param {String} url The url to send request
 * @param {RequestInit} options the options to init request
 * @param {RequestOptions} request_options extra options to be included
 * @returns {Promise<Response>|Object|{http_error: true}}
*/
export default async function request(url, options={}, request_options={}) {
    const eng = request_options.eng || "chat";
    const getJSON = Object.hasOwn(request_options, 'getJSON') ? request_options.getJSON : true
    
    url = request_options.URL || `${BASE_URL[eng]}${url[0]!=='/' && '/'}${url}`;

    options = {
        ...default_options,
        ...options
    }

    if(options.body) {
        options.body = JSON.stringify(options.body)
    }

    const res = await fetch(url, options);
    if(getJSON) {
        if(res.ok) {
            return await res.json();
        } else {
            return { http_error: true }
        }
    } else {
        return res;
    }
}

/**
 * A quick get {@link request} wrap
 * @param {String} url The url to send request
 * @param {RequestInit} options the options to init request
 * @param {RequestOptions} request_options extra options to be included
 * @returns {Promise<Response>|Object|{http_error: true}}
 */
export function get(url, options, request_options) {
    return request(url, {method: 'GET', ...options}, request_options);
}

/**
 * A quick post {@link request} wrap
 * @param {String} url The url to send request
 * @param {RequestInit} options the options to init request
 * @param {RequestOptions} request_options extra options to be included
 * @returns {Promise<Response>|Object|{http_error: true}}
 */
export function post(url, options, request_options) {
    return request(url, {method: 'POST', ...options}, request_options);
}