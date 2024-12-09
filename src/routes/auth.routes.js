import express from 'express';
import { registerCtrl, loginCtrl } from '../controllers/auth.controller.js';

const authRoutes = express.Router();

authRoutes.post('/register', registerCtrl);

authRoutes.post('/login', loginCtrl);

export default authRoutes;