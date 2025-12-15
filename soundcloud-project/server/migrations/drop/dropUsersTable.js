import {pool} from "../../database.js";
import { DROP_USERS_TABLE } from "../../actions.js";

export const dropUsersTable = async () => {
    try {
        const deteteTable = await pool.query(DROP_USERS_TABLE);
        console.log("Table successfuly dropped!")
    }catch(err) {

        
        console.error(err);
        throw err;
    }
}

