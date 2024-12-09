import express from 'express';
import { createTaskCtrl, getTodoListCtrl, getTaskCtrl, setTaskCtrl, deletTasksCtrl } from '../controllers/todo.controller.js';

const todoRoutes = express.Router();

// Create a new task
todoRoutes.post('/', createTaskCtrl);

// Get all tasks
todoRoutes.get('/', getTodoListCtrl);

// Get a single task
todoRoutes.get('/:id', getTaskCtrl);

// Update a single task
todoRoutes.put('/:id', setTaskCtrl);

// Delete a single task
todoRoutes.delete('/:id', deletTasksCtrl);

export default todoRoutes;
