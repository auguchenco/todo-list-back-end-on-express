import dotenv from 'dotenv';
dotenv.config();
const PGDB_NAME_DEFAULT = process.env.PGDB_NAME_DEFAULT;

import pg from 'pg';
const { Pool } = pg;

// Create a connection to a postgres database
export const connectPgDb = async (dbName) => {
  console.log(`CONNECTED TO ${dbName}`);
  return new Pool({
    host: process.env.PGDB_HOST,
    port: process.env.PGDB_PORT,
    database: dbName,
    user: process.env.PGDB_USER,
    password: process.env.PGDB_PASSWORD
  });
};

// Arg. are a postgres database connection
export const disconnectPgDb = async (db) => {
  db.end();
};

// Create a new postgres database
const auxCreatePgDb = async (dbName) => {
  const defaultDb = await connectPgDb(PGDB_NAME_DEFAULT);
  try {
    await defaultDb.query(`CREATE DATABASE ${dbName};`);
    console.log(`Database ${dbName} created successfully`);
  } catch (error) {
    if (error.toString().includes('already exists')) { return }
    else { console.error(`Cannot create database ${dbName}\n`, error) };
  } finally {
    disconnectPgDb(defaultDb);
  };
};

// Set the tables of a db postgre database
const auxSetTablesPgDb = async (db, tables) => {
  for (let i = 0; i < tables.length; i++) {
    try {
      await db.query(tables[i].createQuery);
      console.log(`Table ${tables[i].name} seted successfully`);
    } catch (error) {
      console.error(`Table ${tables[i].name} cannot be created\n`, error);
    };
  };
};

// Initialize a postgre database
export const initPgDb = async (dbName, tables) => {
  try {
    await auxCreatePgDb(dbName);
    const db = await connectPgDb(dbName);
    await auxSetTablesPgDb(db, tables);
    console.log(`If tables was seted, ${db.options.database} initialized successfully`);
    disconnectPgDb(db);
  } catch (error) {
    console.error(`Cannot initialize database ${dbName}\n`, error);
  };
};