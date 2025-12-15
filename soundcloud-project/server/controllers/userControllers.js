import { pool } from "../database.js";
import {
  SELECT_BY_EMAIL,
  SELECT_ALL,
} from "../actions.js";

// verify exsisted user

export const getAllUsers = async (req,res) => {
  try {
    const responce = await pool.query(SELECT_ALL);
    
    console.log(responce.rows);

    console.log("Full responce: ", responce.data)

    res.status(200).json({ success: true, users: responce.rows });

  } catch (err) {
    res.status(500).json({success: false})
    console.error(err);
  }
};

const verifyExsistedUser = async (name, password) => {
  try {
    const params = [name, password];

    const exists = await pool.query(SELECT_BY_EMAIL, [name]);

    if (exists.rows.length) {
      return exists.rows[0];
    }
    return false;
  } catch (err) {
    console.error("userClontroller.js, 14 row: ", err);
  }
};



export const addUser = async (req, res) => {
  console.log("AddUser called");

  
  const { data } = req.body;
  const { user_email, user_password, user_displayName, user_age, user_gender } = data;
  console.log("body: ", req.body)
  
  
    // codding the password
    const hashedPassword = await bycript.hash(data.user_password, 10);

  try {
    // ultimate verify, that user already exsist or not
    if (await verifyExsistedUser(user_email, user_password)) {
      res.send({ success: false, message: "user exist" });
      return;
    }

    const newRow = await pool.query(INSERT_USERS_ROW, [user_email, hashedPassword]);
    console.log("User successfully added in database: ", newRow.rows[0]);

    res.status(200).send({ success: true });
    // const result = pool.query("")
  } catch (err) {
    res.status(500).send({success: false, message: "error"})
    console.error("MAYBE HERE IS ERROR?? :", err);
  }
};

export const checkLoggenedUser = async (req, res) => {
  try {
    const { type, data } = req.body;
    const { user_name, user_password } = data;
    console.log("BODY:", req.body);

    const row = await verifyExsistedUser(type, user_name, user_password);

    if (!row.user_name) {
      res.send({ success: false });
      return;
    }

    console.log("User successfully finded! ");
    res.send({ success: true, user: row });
    return;
  } catch (err) {
    console.error(err);
  }
};
