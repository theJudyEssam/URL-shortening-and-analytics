// this will be for database connection
import pkg from 'pg';
const { Pool } = pkg;


export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database:'url-shortener',
    password: "judy-4832812",
    port: 5432,
  });

