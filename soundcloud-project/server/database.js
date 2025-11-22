


import pkg from "pg"

// const {Pool} = pkg;
const {Pool} = pkg


export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "soundcloud_database",
  password: "password",
  port: 5432,
});

