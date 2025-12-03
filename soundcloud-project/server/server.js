
import express from "express"
import cors from "cors"

import {pool} from "./database.js";
import { CREATE_DATABASE, CREATE_USERS_TABLE,CREATE_TRACKS_TABLE, SELECT_ALL, INSERT_TRACKS_ROW } from "./actions.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();

app.use(cors())
app.use(express.json());


app.use("/api/users", userRoutes)



  app.listen(3000, () => console.log("Server on localhost: " + 3000))


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