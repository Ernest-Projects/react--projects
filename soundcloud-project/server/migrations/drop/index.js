

import { pool } from "../../database.js";
import { dropTracksTable } from "./dropTracksTable.js";
import { dropUsersTable } from "./dropUsersTable.js";

(async () =>{
    try {
        await dropTracksTable()
        await dropUsersTable();
    }
    catch {
        process.exit(1);
    }
    finally {
        await pool.end();
        process.exit(0);
    }
}) ();