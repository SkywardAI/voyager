import { getTable } from "./index.js";
import { FILE_TABLE } from "./types.js";

export async function loadFileToDatabase(fileData) {
    const file_table = await getTable(FILE_TABLE);    
    
    await file_table.add([{ id: fileData.id, bytes: fileData.bytes, created_at: fileData.created_at, filename: fileData.filename }])
 
    return true;
}

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