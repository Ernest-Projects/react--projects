
import express from "express"

import { addUser, checkLoggenedUser, getAllUsers } from "../controllers/userControllers.js"

const userRoutes = express.Router()

userRoutes.post("/add", addUser)
userRoutes.get("/watch", getAllUsers)

userRoutes.post("/check", checkLoggenedUser)


export default userRoutes;