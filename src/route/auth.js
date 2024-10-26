import express from 'express';
import { signup } from '../api/auth /controller/auth.controller.js';
export const authRouter = express.Router();

authRouter.get('/exist-nickname/:nickname');
authRouter.post('/signup',signup);
authRouter.put('/signin');
authRouter.put('/');
authRouter.delete('/');