import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import start from './config/app.start.js'

import tokenAuth from './middlewares/auth.middleware.js';

import authRoutes from './routes/auth.routes.js';
import todoRoutes from './routes/todo.routes.js';

// Set Databases & Enviroment
await start();

// Set Environment Variables
dotenv.config();
const port = process.env.API_PORT;

const app = express(); // Define App
app.use(bodyParser.json()); // Parses the Request
app.use(cors()); // Protect the Backend

// Public Routes
app.use('/auth', authRoutes);

// Bearer Authorization
app.use(tokenAuth);

// Private Routes
app.use('/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.\n`);
});