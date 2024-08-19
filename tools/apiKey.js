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

import { API_KEY_TABLE } from "../database/types.js";
import { getTable } from "../database/index.js";

const MAX_USAGE = 10;

async function queryApiKeyTbl(key, table = null) {
    const tbl = table || await getTable(API_KEY_TABLE);
    const keyQuery = tbl.query()
        .where('api_key = '+"'"+key+"'")
        .limit(1)
        .toArray();
    return keyQuery
}

export async function addKeytoTable(key){
    const tbl = await getTable(API_KEY_TABLE);
    const keyQuery = await queryApiKeyTbl(key, tbl);
    if ( keyQuery.length == 0){
        await tbl.add([{api_key: key, usage: MAX_USAGE}]);
    }
    else {
        return "Cannot add key to table: Key already exists";
    }
}

export async function updateKeyUsage(key){
    const tbl = await getTable(API_KEY_TABLE);
    const keyQuery = await queryApiKeyTbl(key, tbl);
    console.log(keyQuery)
    if (keyQuery.length > 0){
        let usage = keyQuery[0].usage
        console.log(usage);
        usage--;
        await tbl.update({
            where: 'api_key = ' + "'" + key + "'",
            values: {api_key: key, usage: usage}
        });
    }
    else {
        return "Could not find key in table!"
    }
}

/**
 * Check whether passed api_key is validate, usually comes from authorization header.
 * @param {String} api_key 
 * @returns {Boolean}
 * 
 * @example
 * const api_key_validated = validateAPIKey(extractAPIKeyFromRequest(request))
 */
export function validateAPIKey(api_key) {
    if(!api_key) return false;

    if(+process.env.STATIC_API_KEY_ENABLED && process.env.STATIC_API_KEY) {
        if(api_key !== process.env.STATIC_API_KEY) return false;
    }
    return true;
}

/**
 * Extract api_key from request.headers.authorization
 * @param {Request} request The request object
 * @returns {String|null} The api key or null if there's no valid api_key found
 */
export function extractAPIKeyFromRequest(request) {
    return extractAPIKeyFromHeader(request.headers);
}

/**
 * Extract api_key from authorization attribute in passed header
 * @param {Request.header} header the header of request
 * @returns {String|null} The api key or null if there's no valid api_key found
 */
export function extractAPIKeyFromHeader(header) {
    if(typeof header !== "object") return null;

    const {authorization} = header;
    if(!authorization || !authorization.startsWith("Bearer ")) return null;
    const api_key = authorization.split("Bearer ").pop();
    return api_key || null;
}