


export const CREATE_TABLE = `CREATE TABLE logged_users (
user_id BIGSERIAL PRIMARY KEY,
user_name VARCHAR(50) NOT NULL,
user_password VARCHAR(255) NOT NULL);`

// is_user_active BOOLEAN DEFAULT TRUE);
// user_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// email VARCHAR(100) UNIQUE NOT NULL,

export const DROP_TABLE = `DROP TABLE logged_users;`

export const DELETE_ROW = "DELETE FROM logged_users WHERE user_id = " +  "$1" +  " RETURNING *;"

export const INSERT_ROW = `
      INSERT INTO logged_users (user_name, user_password)
      VALUES ($1, $2)
      RETURNING *`;  

export const SELECT_BY_ID = `SELECT * FROM logged_users WHERE user_id = $1;`
export const SELECT_ALL = `SELECT * FROM logged_users;`

 
export const UPDATE_BY_ID = `UPDATE logged_users SET user_password = $1 WHERE user_id = $2 RETURNING *;`

