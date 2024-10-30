import express from 'express';
import { loginCheckMiddleWare } from '../middleware/loginCheck.middleware.js';
import { deleteUser, existNickname, updateUser } from '../api/user/controller/user.controller.js';
export const userRouter = express.Router();


userRouter.get('/exist-nickname/:nickname',existNickname);
userRouter.put('/',loginCheckMiddleWare,updateUser);
userRouter.delete('/',loginCheckMiddleWare,deleteUser);