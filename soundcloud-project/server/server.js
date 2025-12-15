
import express from "express"
import cors from "cors"


import {pool} from "./database.js";
import { CREATE_DATABASE, INSERT_USERS_LOCAL, SELECT_ALL, INSERT_TRACKS_ROW } from "./actions.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
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