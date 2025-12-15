
import bcrypt from "bcryptjs";
import { pool } from "../database.js";
import {
  SELECT_BY_EMAIL,
  INSERT_USERS_LOCAL,
  SELECT_ALL,
} from "../actions.js";

export const addLocal = async (req, res) => {

// verify is contoller work
  console.log("addLocal called here!");

  
//   set data user in data
  const { data } = req.body;

//   destructurization of all user data (input data!)
  const {user_display_name, user_email, user_password, user_age, user_gender, provider } = data;
  console.log("body: ", req.body)
  
  
    // password encryption 
    const hashed_user_password = await bcrypt.hash(user_password, 10);

  try {

    // ultimate verify, that user already exsist or not
    if (await verifyExsistedUser(user_email)) {
      res.send({ success: false, message: "user exist" });
      return;
    }
    // create new row
    const newRow = await pool.query(INSERT_USERS_LOCAL, [user_display_name, user_email, hashed_user_password, user_age, user_gender]);
 
    console.log("User successfully added in database: ", newRow.rows[0]);

    res.status(200).send({ success: true });
    // const result = pool.query("")

  } catch (err) {
    res.status(500).send({success: false, message: "error"})
    console.error("MAYBE HERE IS ERROR?? :", err);
  }
};



const verifyExsistedUser = async (email, password) => {
  try {

    const exists = await pool.query(SELECT_BY_EMAIL, [email]);

    if (exists.rows.length) {
      return exists.rows[0];
    }
    return false;
  } catch (err) {
    console.error("local-entry.js, 61 row: ", err);
  }
};