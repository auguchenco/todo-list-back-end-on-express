import { connectPgDb } from "../config/databases/postgres/postgres.js";
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();
const PGDB_NAME = process.env.PGDB_NAME



// MongoDB
const taskSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  user_id: { type: Number, required: true },
  created_at: Date,
  updated_at: Date
}); // Did not use { timestamps: true } because used the PostgresSQL data structure and values
const Task = mongoose.model('Task', taskSchema);

// PostgreSQL
const pgDb = await connectPgDb(PGDB_NAME);



export const createTask = async (userId, title, description) => {
  const resultPgDb = await pgDb.query(`INSERT INTO todo_list (user_id, title, description) VALUES ($1, $2, $3) RETURNING id, title, description, completed, user_id, created_at, updated_at;`, [userId, title, description]);
  const newTaskPgDb = resultPgDb?.rows[0];

  const resultMoDb = new Task(newTaskPgDb);
  const newTaskMoDb = await resultMoDb.save();

  console.log('NEW TASK PG:\n', newTaskPgDb);
  console.log('NEW TASK MO:\n', newTaskMoDb);

  return [newTaskPgDb, newTaskMoDb];
};

export const getTodoList = async (userId) => {
  let todoListMoDb = await Task.find({ 'user_id': userId });

  if (JSON.stringify(todoListMoDb) == '[]') {
    const resultPgDb = await pgDb.query(`SELECT * FROM todo_list WHERE user_id = $1;`, [userId]);
    const todoListPgDb = resultPgDb?.rows;
    console.log('TODO LIST PG:\n', todoListPgDb);

    if (todoListPgDb.length > 0) {
      for (let i = 0; i < todoListPgDb.length; i++) {
        let resultMoDb = new Task(todoListPgDb[i]);// Did not use { timestamps: true } because used the PostgresSQL data structure and values
        await resultMoDb.save();
      };
      todoListMoDb = await Task.find({ 'user_id': userId });
      console.log('Todo list not found on MongoDB, saved on MongoDB');
    };
  };

  console.log('TODO LIST MO:\n', todoListMoDb);

  return todoListMoDb;
};

export const getTaskById = async (id, userId) => {
  const resultMoDb = await Task.find({ "id": id, "user_id": userId });
  let taskMoDb = resultMoDb[0];

  if (!taskMoDb) {
    const resultPgDb = await pgDb.query(`SELECT * FROM todo_list WHERE id = $1 AND user_id = $2;`, [id, userId]);
    const taskPgDb = resultPgDb?.rows[0];
    console.log('TASK PG:\n', taskPgDb);

    if (taskPgDb) {
      const resultMoDb = new Task(taskPgDb);// Did not use { timestamps: true } because used the PostgresSQL data structure and values
      taskMoDb = await resultMoDb.save();
      console.log('Task not found on MongoDB, saved on MongoDB');
    };
  };

  console.log('TASK MO:\n', taskMoDb);

  return taskMoDb;
};

export const setTask = async (id, userId, title, description, completed) => {
  const resultPgDb = await pgDb.query(`UPDATE todo_list SET title = $3, description = $4, completed = $5 WHERE id = $1 AND user_id = $2 RETURNING id, title, description, completed, user_id, created_at, updated_at;`, [id, userId, title, description, completed]);
  const taskPgDb = resultPgDb?.rows[0];
  console.log('TASK PG:\n', taskPgDb);

  if (!taskPgDb) {
    console.log('TASK MO:\n', undefined);
    return [taskPgDb, undefined];
  };

  let taskMoDb = await Task.findOneAndUpdate(
    { "id": id, "user_id": userId },
    { ...taskPgDb },
    { new: true }
  );

  if (taskMoDb == null) {
    const resultMoDb = new Task(taskPgDb);// Did not use { timestamps: true } because used the PostgresSQL data structure and values
    taskMoDb = await resultMoDb.save();
    console.log('Task not found on MongoDB, saved on MongoDB');
  };

  console.log('TASK MO:\n', taskMoDb);

  return [taskPgDb, taskMoDb];
};

export const deletTask = async (id, userId) => {
  const resultPgDb = await pgDb.query(`DELETE FROM todo_list WHERE id = $1 AND user_id = $2 RETURNING id, title, description, completed, user_id, created_at, updated_at;`, [id, userId]);
  const deletedTaskPgDb = resultPgDb?.rows[0];
  console.log('NEW TASK PG:\n', deletedTaskPgDb);

  if (!deletedTaskPgDb) {
    console.log('NEW TASK MO:\n', undefined);
    return [deletedTaskPgDb, undefined];
  };

  let deletedTaskMoDb = await Task.findOneAndDelete({ "id": id, "user_id": userId });

  if (deletedTaskMoDb == null) {
    console.log('Task not found on MongoDB, has been deleted before');
    console.log('NEW TASK MO:\n', deletedTaskMoDb);
    return [deletedTaskPgDb, deletedTaskPgDb];
  };

  console.log('NEW TASK MO:\n', deletedTaskMoDb);

  return [deletedTaskPgDb, deletedTaskMoDb];
};