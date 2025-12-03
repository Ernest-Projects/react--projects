export const CREATE_TRACKS_TABLE = `CREATE TABLE tracks (
track_id BIGSERIAL PRIMARY KEY,
track_owner_id INTEGER REFERENCES users(user_id),
audio_url TEXT NOT NULL,
image_url TEXT NOT NULL,
title_name TEXT NOT NULL,
title_subtitle TEXT NOT NULL,
created_at TIMESTAMP DEFAULT NOW()
);`;

export const CREATE_USERS_TABLE = `CREATE TABLE users (
user_id BIGSERIAL PRIMARY KEY,
user_name VARCHAR(50) UNIQUE NOT NULL,
user_email VARCHAR(100) UNIQUE NOT NULL,
user_password VARCHAR(255) NOT NULL,
user_avatar TEXT,
user_country TEXT,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);`;




export const CREATE_DATABASE = `CREATE DATABASE SoundCloud_database;`;

export const ADD_NEW_COLUMN_IN_TABLE = `ALTER TABLE tracks ADD COLUMN name INTEGER DEFAULT 0;`


// is_user_active BOOLEAN DEFAULT TRUE);
// user_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// email VARCHAR(100) UNIQUE NOT NULL,

export const DROP_TABLE = `DROP TABLE logged_users;`

export const DELETE_ROW = "DELETE FROM logged_users WHERE user_id = " +  "$1" +  " RETURNING *;"

//  insert new row after log in
export const INSERT_USERS_ROW = `
      INSERT INTO users (user_name, user_email, user_password, user_avatar, user_country)
      VALUES ('ernest_test2', $1, $2, NULL, 'Ukraine')
      RETURNING *`;  

  
export const INSERT_TRACKS_ROW = `
      INSERT INTO tracks (track_owner_id, audio_url, image_url, title_name, title_subtitle)
      VALUES (1, 'shedontluvyou.mp3', 'artworks-vuCkwwjyIzFwyqca-Y1AvQg-t500x500.jpg', 'shedontluvyou', 'jdmfessh')
      RETURNING *`; 

export const SELECT_BY_ID = `SELECT * FROM logged_users WHERE user_id = $1;`
export const SELECT_ALL = `SELECT * FROM users;`

export const SELECT_BY_NAME_AND_PASSWORD = `SELECT * FROM logged_users WHERE user_name = $1 AND user_password = $2;`
export  const SELECT_BY_EMAIL_AND_PASSWORD = `SELECT * FROM users WHERE user_email = $1 AND user_password = $2;`
export const SELECT_BY_NAME = `SELECT * FROM logged_users WHERE user_name = $1;`
 
export const UPDATE_BY_ID = `UPDATE logged_users SET user_password = $1 WHERE user_id = $2 RETURNING *;`


