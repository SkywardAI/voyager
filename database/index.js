import * as lancedb from "@lancedb/lancedb";
import { get, post } from "../tools/request.js"
import { Schema, Field, FixedSizeList, Int16, Float16, Utf8 } from "apache-arrow";

const uri = "/database/lancedb/";
const db = await lancedb.connect(uri);

const table = await db.createEmptyTable("rag_data", new Schema([
    new Field("id", new Int16()),
    new Field("vector", new FixedSizeList(384, new Field("item", new Float16(), true)), false),
    new Field("question", new Utf8()),
    new Field("answer", new Utf8())
]), {
    // mode: "overwrite",
    existOk: true
})

export async function loadDataset(dataset_link) {
    const {rows, http_error} = await get('', {}, { URL: dataset_link })
    if(http_error) {
        return false;
    }
    await table.add(rows.map(({ row_id, row })=>{
        const { question, answer, question_embedding } = row;
        return { id: row_id, question, answer, vector: question_embedding }
    }))
    return true;
}

export async function searchByEmbedding(vector) {
    const record = await table.search(vector).limit(1).toArray();
    if(!record.length) return null;
    const { question, answer } = record[0];
    return { question, answer };
}

export async function searchByMessage(msg) {
    const { embedding } = await post('embedding', {body: {
        content: msg
    }}, { eng: "rag" });
    return await searchByEmbedding(embedding);
}