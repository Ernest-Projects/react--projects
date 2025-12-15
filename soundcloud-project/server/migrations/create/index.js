

import { createTracksTable } from "./createTracksTable.js";
import { createUsersTable } from "./createUsersTable.js";
import { pool } from "../../database.js";

(async () =>{
    try {
        await createUsersTable()
        await createTracksTable();
    }
    catch {
        process.exit(1);
    }finally {
    await pool.end();
    process.exit(0);
    }
}) ();