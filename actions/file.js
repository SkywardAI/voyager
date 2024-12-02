// coding=utf-8

import { extractAPIKeyFromRequest, validateAPIKey } from "../tools/apiKey.js";
import * as fs from 'fs';

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

export async function uploadFile(req, res) {
    if (!validateAPIKey(extractAPIKeyFromRequest(req))) {
        res.status(401).send("Not Authorized!");
        return;
    }
    const { file } = req;
    console.log(file);
    if (!file) {
        res.status(400).send("Input file not specified");
        return;
    }

    // Check file type (currently only accept json)


    // Check file size limit (10MB)
    if (file.size / 1000000 > 10) {
        res.status(400).send("Only accepting file size smaller than 10MB");
        return;
    }

    

    // load file
    const uploadPath = `files/${file.originalname}`;
    // let buffer = Buffer.from(file.buffer);
    fs.writeFileSync(uploadPath, file.buffer, (err) => {
        if (err) throw err;
        console.log("File has been saved");
    })

    res.status(200).send({
        "id": "file id",
        "object": "file",
        "bytes": file.size,
        "created_at": Date.now(),
        "filename": file.originalname,
    });
    return;
}

export async function getAllFiles(req, res) {

}