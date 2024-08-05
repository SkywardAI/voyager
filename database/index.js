import { connect } from "@lancedb/lancedb";
import { 
    Schema, Field, FixedSizeList, 
    Float32, Utf8, 
    // eslint-disable-next-line
    Table 
} from "apache-arrow";
import { DATASET_TABLE, SYSTEM_TABLE } from "./types";

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
        new Field("question", new Utf8()),
        new Field("answer", new Utf8())
    ]), open_options)
}

initDB();

/**
 * Open a table with table name
 * @param {String} table_name table name to be opened
 * @returns {Promise<Table>} Promise containes the table object.
 */
export async function getTable(table_name) {
    return await db.openTable(table_name)
}