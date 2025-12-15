


import {pool} from "../../database.js";
import { CREATE_USERS_TABLE } from "../../actions.js";

export const createUsersTable = async () => {
    try {
        const createTable = await pool.query(CREATE_USERS_TABLE);
        console.log("Table successfuly dropped!")
    }catch(err) {

        
        console.error(err);
        throw err;
    }
}

