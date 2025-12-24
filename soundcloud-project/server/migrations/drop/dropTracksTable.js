


import {pool} from "../../database.js";
import { DROP_TRACKS_TABLE } from "../../actions.js";

export const dropTracksTable = async () => {
    try {
        
        await pool.query(DROP_TRACKS_TABLE);
        console.log("Table successfuly dropped!")
   
    }catch(err) {

        
        console.error(err);
        throw err;
    }
}

