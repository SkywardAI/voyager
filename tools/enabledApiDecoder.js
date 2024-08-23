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

const allow_paths = {
    index: {
        docs: false,
        stats: false,
        healthy: false,
        chatbox: false
    },
    inference: {
        completions: false,
        rag: false
    },
    token: {
        allowed: false
    },
    embedding: {
        index: false,
        dataset: false
    },
    version: {
        allowed: false
    }
}

const allow_indexes = {
    index: false,
    inference: false,
    token: false,
    embedding: false,
    version: false
}

export function decodeEnabledAPIs() {
    const AVAILABLE_APIS = process.env.AVAILABLE_APIS;
    if(AVAILABLE_APIS === 'ALL') {
        for(const route in allow_paths) {
            for(const sub_route in allow_paths[route]) {
                allow_paths[route][sub_route] = true;
            }
        }
        for(const route in allow_indexes) {
            allow_indexes[route] = true;
        }
        return;
    }

    const paths = AVAILABLE_APIS.split('.');
    Object.keys(allow_paths).forEach((path_name, path_index) => {
        Object.keys(allow_paths[path_name]).forEach((api_name, api_index) => {
            allow_paths[path_name][api_name] = !!+paths[path_index][api_index];
        })
    })
    for(const route in allow_indexes) {
        allow_indexes[route] = !!Object.values(allow_paths[route]).filter(e=>e).length
    }
}

/**
 * check if provided route enabled
 * @param {"index"|"inference"|"embedding"|"version"|"token"} index_path_name name of route index
 * @param {"docs"|"stats"|"healthy"|"chatbox"|"completions"|"rag"|"calculate"|"dataset"} api_name name of specific api
 * @returns {Boolean}
 */
export function isRouteEnabled(index_path_name, api_name = null) {
    if(!api_name) {
        return allow_indexes[index_path_name];
    } else {
        return allow_paths[index_path_name][api_name];
    }
}