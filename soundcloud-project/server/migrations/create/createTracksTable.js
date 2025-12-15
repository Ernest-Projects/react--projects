


import {pool} from "../../database.js";
import { CREATE_TRACKS_TABLE } from "../../actions.js";

export const createTracksTable = async () => {
    try {
        const createTable = await pool.query(CREATE_TRACKS_TABLE);
        console.log("Table successfuly dropped!")
    }catch(err) {

        
        console.error(err);
        throw err;
    }
}

