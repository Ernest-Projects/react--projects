// .env
import dotenv from "dotenv";
dotenv.config();

import express from "express"
import cors from "cors"


import {pool} from "./database.js";
import userRoutes from "./routes/userRoutes.js"


const app = express();


const ORIGIN_URL = process.env.ORIGIN_URL;
const PORT = process.env.PORT;

if(!ORIGIN_URL) throw new Error(" Url in .env is not defined!");;
if(!PORT) throw new Error(" Port in .env is not defined!");;


app.use(cors({
  origin: ORIGIN_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));


app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

app.use(express.json());

app.use("/api/users", userRoutes);

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log("Server on localhost: " + PORT))



 
// tabla 
// const initializeTable = async() =>{
//     try {
//         const createTable = await pool.query(CREATE_TRACKS_TABLE);
//         const addRow = await pool.query(INSERT_TRACKS_LOCAL);

//     }catch(err) {
//          console.error(err)
//     } 
// }
// drop




// initializeTable().then(res => {
//     console.log("Table tracks with foreign key initialized !")

// }).catch(err => console.error(err))


// createDatabase().then(res =>{
//     console.log("Database created successfully!")
// }).catch(err => console.error(err)) 