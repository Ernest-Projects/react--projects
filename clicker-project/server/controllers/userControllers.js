import { pool } from "../database.js";
import {
  INSERT_ROW,
  SELECT_BY_ID,
  SELECT_BY_NAME_AND_PASSWORD,
  SELECT_BY_NAME,
} from "../actions.js";

// verify exsisted user
const verifyExsistedUser = async (type, name, password) => {
  try {
    const params = type == "registration" ? [name] : [name, password];
    const exists = await pool.query(
      type == "registration" ? SELECT_BY_NAME : SELECT_BY_NAME_AND_PASSWORD,
      params
    );
    if (exists.rows.length) {
      return exists.rows[0];
    }
    return false;
  } catch (err) {
    console.error("userClontroller.js, 14 row: ", err);
  }
};

export const addUser = async (req, res) => {
  console.log("AddUser called"); // <- це завжди має з’явитися, якщо запит доходить

  const { type, data } = req.body;
  const { user_name, user_email, user_password, confirm_user_password } = data;

  try {
    // ultimate verify, that user already exsist or not
    if (await verifyExsistedUser(type, user_name, user_password)) {
      res.send({ success: false });
      return;
    }

    const newRow = await pool.query(INSERT_ROW, [
      user_name,
      user_email,
      user_password,
      confirm_user_password,
    ]);
    console.log("User successfully added in database: ", newRow.rows[0]);

    res.send({ success: true });
    // const result = pool.query("")
  } catch (err) {
    console.error(err);
  }
};

export const checkLoggenedUser = async (req, res) => {
  try {
    const { type, data } = req.body;
    const { user_name, user_password } = data;

    const row = await verifyExsistedUser(type, user_name, user_password);
    
    if (!row.user_name) {
      res.send({ success: false });
      return;
    }

    console.log("User successfully finded! ")    
    res.send({ success: true, user: row });
    return;

  } catch (err) {
    console.error(err);
  }
};
