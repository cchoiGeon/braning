import express from 'express';
import { signin, signup } from '../api/auth /controller/auth.controller.js';
export const authRouter = express.Router();

authRouter.post('/signup',signup);
authRouter.put('/signin',signin);