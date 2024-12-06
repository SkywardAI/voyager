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

import { getTable } from "./index.js";
import { FILE_TABLE } from "./types.js";

/**
 * @typedef FileMetadataStructure
 * @property {String} id Id of the uploaded file
 * @property {Number} bytes Size of the uploaded file
 * @property {Number} created_at Date of uploaded, measure in miliseconds
 * @property {String} filename Name of the file 
 */

/**
 * Get all files metadata currently in database
 * @returns {Promise<FileMetadataStructure[]>}
 */
export async function getAllFilesData() {
    const file_table = await getTable(FILE_TABLE);

    let queryResult = await file_table.query().toArray();
    let result = []
    for (let i in queryResult) {
        const batch = queryResult[i];
        const mid = {
            id: batch.id,
            bytes: batch.bytes,
            created_at: Number(batch.created_at),
            filename: batch.filename
        }
        result.push(mid)
    }

    return result;
}

/**
 * Upload file metadata into database
 * @param {FileMetadataStructure} fileData Metadata of the uploaded file
 * @returns {Boolean} Success status of storing into database
 */
export async function loadFileToDatabase(fileData) {
    const file_table = await getTable(FILE_TABLE);    
    
    await file_table.add([{ id: fileData.id, bytes: fileData.bytes, created_at: fileData.created_at, filename: fileData.filename }])
 
    return true;
}
