
import express from "express"

import { addUser, checkLoggenedUser, getAllUsers } from "../controllers/userControllers.js"
import { addLocal } from "../controllers/local-entry.js"
const userRoutes = express.Router()

userRoutes.post("/add/local", addLocal)
userRoutes.get("/watch", getAllUsers)
userRoutes.post("/check", checkLoggenedUser)


export default userRoutes;