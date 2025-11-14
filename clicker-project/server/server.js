// import dotenv
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {pool } from "./database.js";
import { CREATE_TABLE, DELETE_ROW, INSERT_ROW, SELECT_ALL, SELECT_BY_ID, UPDATE_BY_ID } from "./actions.js";

// dotenv lib
dotenv.config()

// use .env variables
const server_port = Number(process.env.SERVER_PORT);
const server_url = process.env.SERVER_URL;

const app = express();
 
app.use(express.json());

app.use(cors())

// app.get("/user/:id", (req, res) => {
//     res.send("Responce on main home page: ", req.body)
//     const {id} = req.body;
// })

const getUserById = async (id) => {
    try {
        const findedId = await pool.query(SELECT_BY_ID, [id])
        return findedId.rows[0];
    }
    catch(err)  {
        console.error(err)
    }
}

// app.get("/user/:id ", async (req, res) =>  {
//     try{
//         const {id} = req.params;
//         const user =  await getUserById(id);
//         if (!user) {
//             res.json({message: "User is not defined!", data: user});
//         }
//         console.log("finded user by id: ", user);
//         res.json({message: "User finded: ", data: user})

        
//         // res.send("Responce: " + JSON.stringify(req.body)) 

//     }
//     catch (err) {
//         console.error(err) 
//         res.status(500)
//     }
//     // console.log("Getted user name:  ", req.query.name)
// });



app.get("/user", async (req, res) =>  {
    try{

        const result = await pool.query(SELECT_ALL)
        res.json({message: "Logged users: ", data: result.rows})
        res.status(200).send("Success!")

        // res.send("Responce: " + JSON.stringify(req.body)) 
    }
    catch (err) {
        console.error(err) 
        res.status(500).send("Something went wrong")
    }
    // console.log("Getted user name:  ", req.query.name)
});


const updateElementById = async (id, newPassword) => {
    try {
        const updatedRow = await pool.query(UPDATE_BY_ID, [newPassword,id])
        return updatedRow.rows[0];
    }
    catch (err) { 
        console.error(err);
    }; 
}
 


// change row in table
app.put("/user/:id/:newPassword", async  (req, res) => {
    try {

        const {id, newPassword} = req.params;

        const updatedElement = await updateElementById(id, newPassword)
        
        res.json({message: "User password successfully reset !", data: updatedElement })
        res.status(200).send("User updated!")
    }catch(err) {
        console.error(err)
        res.status(500).send("Err: User is not updated")
    }
})


const deleteRow = async (id) => {
    try {
        const result = await pool.query(DELETE_ROW, [Number(id)])

        console.log("Deleted row: ", result.rows[0])
        
        return result.rows[0];

    } catch (error) {
        console.error(error)
        throw error
    }
}
const addRow = async (name, password) => {
    try {
        const result =  await pool.query(INSERT_ROW, [name, password]);
        return result.rows[0]
    }
    catch (err) {
        console.error(err)
        throw err
    }
}
const addTable = async (name) => {
    try  {
        
        const result = await pool.query(CREATE_TABLE);
        return result.rowCount
 
    }catch (err) {
        console.error(err)
    }
}


app.listen(server_port, () => {
    console.log('Server running on port: ', server_port)
})

// create table in clicker_database
// addTable("logged_users").then(addTable => {
//     if (addTable) {
//         console.log("table in clicker_database created!")
//     }
//     else {
//         console.log("table hasn't been added in database");
//     }
// }).catch((err) => {
//     console.log("something goes wrong!");})

// for (let i = 1; i <= 26; i++) {

//     deleteRow(i).then((deletedItem) => {
//         if (deletedItem) {
//             console.log("Element successfuly deleted from table")
//         }
//         else {
//             console.log("Item not found")
//         }
    
//     }).catch((err) => console.log("failed to resolve: ", err))
// }

// app.post("/user", async (req, res) => {
//   try {
//     const { user_id, user_name, user_password } = req.body;
//     console.log(user_id)
  

//     // const insert = await pool.query(INSERT_INTO, [ user_name, user_password]);
//     const delete_row = await pool.query(DELETE_ROW, [31]);


//     console.log("Data saved!", delete_row);
//     res.status(200).json({ message: "User saved successfully" });
//   } 
//   catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something goes wrong!" });
//   }

// });
// addRow("Ernest", "5621").then(addedRow => {
//     if(addedRow) {
//         console.log("Row successfuly added")
//     }
//     else {
//         console.log("Not added! (why)")
//     }
// }).catch(err => console.log("Something goes wrong: ", err))


app.listen(server_port, () => console.log("Server on localhost: " + server_port))