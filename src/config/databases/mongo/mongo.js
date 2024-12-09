import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();
const MODB_URI = process.env.MODB_URI;

export const connectMoDb = async () => {
  try {
    mongoose.connect(MODB_URI);
  } catch (error) {
    console.error('Error trying to connect to mongo database', error);
    process.exit(1);
  };
};

export const initMoDb = async () => {
  connectMoDb();
  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};

