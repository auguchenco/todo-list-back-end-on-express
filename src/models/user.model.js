import { connectPgDb } from "../config/databases/postgres/postgres.js";

import dotenv from 'dotenv';
dotenv.config();
const PGDB_NAME = process.env.PGDB_NAME

const pgDb = await connectPgDb(PGDB_NAME);

export const createUser = async (username, password) => {
  const result = await pgDb.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username`, [username, password]);
  return result?.rows[0];
};

export const getUserByUsername = async (username) => {
  const result = await pgDb.query(`SELECT * FROM users WHERE username = $1`, [username]);
  return result?.rows[0];
};