import { initMoDb } from './mongo/mongo.js';
import { initPgDb } from './postgres/postgres.js';
// import tables from './postgres/tables.json' assert { type: "json" };

const tables = [
  {
    "name": "users",
    "createQuery": "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )"
  },
  {
    "name": "todo_list",
    "createQuery": "CREATE TABLE IF NOT EXISTS todo_list ( id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, completed BOOLEAN DEFAULT false, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )"
  }
];

import dotenv from 'dotenv';
dotenv.config();
const PGDB_NAME = process.env.PGDB_NAME;

const initDb = async () => {
  try {
    await initPgDb(PGDB_NAME, tables);
    await initMoDb();
  } catch (error) {
    console.error(`Cannot initialize databases\n`, error);
  };
};

export default initDb;