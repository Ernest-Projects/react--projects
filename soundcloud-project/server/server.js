
import express from "express"
import cors from "cors"

import {pool} from "./database.js";
import { CREATE_DATABASE, CREATE_USERS_TABLE,CREATE_TRACKS_TABLE, INSERT_TRACKS_ROW } from "./actions.js";

const app = express();

app.use(cors())
app.use(express.json());



// creating database 
const createDatabase = async() => {
    try {
        const createBase = await pool.query(CREATE_DATABASE);
    }catch(err) {
        console.error(err)
    }
}

// tabla 
const initializeTable = async() =>{
    try {
        const createTable = await pool.query(CREATE_TRACKS_TABLE);
        const addRow = await pool.query(INSERT_TRACKS_ROW);

    }catch(err) {
         console.error(err)
    }
}

// initializeTable().then(res => {
//     console.log("Table tracks with foreign key initialized !")

// }).catch(err => console.error(err))


// createDatabase().then(res =>{
//     console.log("Database created successfully!")
// }).catch(err => console.error(err)) 