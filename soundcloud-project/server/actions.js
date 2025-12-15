
// TRACKS
// -----------------------------------------------------------------
export const CREATE_TRACKS_TABLE = `CREATE TABLE tracks (
track_id BIGSERIAL PRIMARY KEY,
track_owner_id INTEGER NOT NULL REFERENCES users(user_id),

audio_url TEXT NOT NULL,
image_url TEXT NOT NULL,
title_name TEXT NOT NULL,
title_subtitle TEXT NOT NULL,

created_at TIMESTAMP DEFAULT NOW()
);`;

// -----------------------------------------------------------------



// USERS
// -----------------------------------------------------------------

export const CREATE_USERS_TABLE = `CREATE TABLE users (
user_id BIGSERIAL PRIMARY KEY,


user_email VARCHAR(100) UNIQUE NOT NULL,
user_password VARCHAR(255),
user_display_name VARCHAR(50) UNIQUE NOT NULL,
user_age SMALLINT CHECK (user_age <= 120 AND user_age >= 0),
user_gender VARCHAR(6) NOT NULL,


user_avatar TEXT,
user_country TEXT,


created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW(),


provider VARCHAR(10) NOT NULL,
user_google_avatar TEXT ,
google_uid VARCHAR(255) UNIQUE
);`;

// -----------------------------------------------------------------


// ПОДАЛЬШІ ДІЇ:

// Стоворити локального юзера, а потім і трек, який буде віповідати йому. правильно реалізувати типи та стани в redux,
//щоб в подальшому додавати в базу.

// Реалізувати два контролери, кожен з яких буде спеціалізовуватися на локальному вході та вході через Google. 

// Реалізувати валідацію і для локального так і для Google входу (окремі два валідатори)

// -----------------------------------------------------------------

export const CREATE_DATABASE = `CREATE DATABASE SoundCloud_database;`;

export const ADD_NEW_COLUMN_IN_TABLE = `ALTER TABLE tracks ADD COLUMN name INTEGER DEFAULT 0;`

// is_user_active BOOLEAN DEFAULT TRUE);
// user_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// email VARCHAR(100) UNIQUE NOT NULL,


export const DROP_USERS_TABLE = `DROP TABLE IF EXISTS users;`
export const DROP_TRACKS_TABLE = `DROP TABLE IF EXISTS tracks;`

export const DELETE_ROW = "DELETE FROM logged_users WHERE user_id = " +  "$1" +  " RETURNING *;"



// -----------------------------------------------------------------
// INSERTING 

// USERS

//  insert local data, if user entered without google
export const INSERT_USERS_LOCAL = `
      INSERT INTO users (user_display_name, user_email, user_password, user_age, user_gender, user_avatar, user_country, provider, user_google_avatar, google_uid)
      VALUES ($1, $2, $3, $4, $5, NULL, NULL, 'local', NULL, NULL)
      RETURNING *`;  

// insert if user choose google account (OAuth)
export const INSERT_USERS_GOOGLE = `
      INSERT INTO users (user_displayName, user_email, user_password, user_age, user_gender, user_avatar, user_country, provider, user_google_avatar, google_uid)
      VALUES ($1, $2,NULL, $3, $4, NULL, NULL, 'google', $5, $6)
      RETURNING *`;  

// -----------------------------------------------------------------


// TRACKS 

export const INSERT_TRACKS_ROW = `
      INSERT INTO tracks (track_owner_id, audio_url, image_url, title_name, title_subtitle)
      VALUES (1, 'shedontluvyou.mp3', 'artworks-vuCkwwjyIzFwyqca-Y1AvQg-t500x500.jpg', 'shedontluvyou', 'jdmfessh')
      RETURNING *`; 

// -----------------------------------------------------------------


export const SELECT_BY_ID = `SELECT * FROM logged_users WHERE user_id = $1;`
export const SELECT_ALL = `SELECT * FROM users;`


export const SELECT_BY_NAME_AND_PASSWORD = `SELECT * FROM logged_users WHERE user_name = $1 AND user_password = $2;`
export  const SELECT_BY_EMAIL = `SELECT * FROM users WHERE user_email = $1;`
export const SELECT_BY_NAME = `SELECT * FROM logged_users WHERE user_name = $1;`
 

export const UPDATE_BY_ID = `UPDATE logged_users SET user_password = $1 WHERE user_id = $2 RETURNING *;`


