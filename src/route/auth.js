import express from 'express';
import { deleteUser, existNickname, signin, signup, updateUser } from '../api/auth /controller/auth.controller.js';
import { loginCheckMiddleWare } from '../middleware/loginCheck.middleware.js';
export const authRouter = express.Router();

authRouter.get('/exist-nickname/:nickname',existNickname);
authRouter.post('/signup',signup);
authRouter.put('/signin',signin);
authRouter.put('/user',loginCheckMiddleWare,updateUser);
authRouter.delete('/user',loginCheckMiddleWare,deleteUser);