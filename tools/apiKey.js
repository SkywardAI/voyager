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
const tbl = await getTable(API_KEY_TABLE);

function queryApiKeyTbl(key) {
    const keyQuery = tbl.query()
        .where('api_key = '+"'"+key+"'")
        .limit(1)
        .toArray();
    return keyQuery
}

export async function addKeytoTable(key){
    const keyQuery = await queryApiKeyTbl(key);
    if ( keyQuery.length == 0){
        await tbl.add([{api_key: key, usage: MAX_USAGE}]);
    }
    else {
        return "Cannot add key to table: Key already exists";
    }
}

export async function updateKeyUsage(key){
    const keyQuery = await queryApiKeyTbl(key);
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