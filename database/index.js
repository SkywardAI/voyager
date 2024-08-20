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

import { connect } from "@lancedb/lancedb";
import { 
    Schema, Field, FixedSizeList, 
    Float32, Utf8, Int32,
    // eslint-disable-next-line
    Table 
} from "apache-arrow";
import { API_KEY_TABLE, DATASET_TABLE, SYSTEM_TABLE } from "./types.js";

const uri = "/tmp/lancedb/";
const db = await connect(uri);

export async function initDB(force = false) {
    const open_options = force ? { mode: "overwrite" } : { existOk: true }
    // create or re-open system table to store long-lasting data
    await db.createEmptyTable(SYSTEM_TABLE, new Schema([
        new Field("title", new Utf8()),
        new Field("value", new Utf8())
    ]), open_options)
    // create or re-open dataset table
    await db.createEmptyTable(DATASET_TABLE, new Schema([
        new Field("vector", new FixedSizeList(384, new Field("item", new Float32(), true)), false),
        new Field("dataset_name", new Utf8()),
        new Field("context", new Utf8()),
        new Field("identifier", new Utf8())
    ]), open_options);
    // create or re-open api key table
    await db.createEmptyTable(API_KEY_TABLE, new Schema([
        new Field("api_key", new Utf8()),
        new Field("usage", new Int32())
    ]), open_options);
}

/**
 * Open a table with table name
 * @param {String} table_name table name to be opened
 * @returns {Promise<Table>} Promise containes the table object.
 */
export async function getTable(table_name) {
    return await db.openTable(table_name)
}