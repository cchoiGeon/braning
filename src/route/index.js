import express from 'express';
import { authRouter } from './auth.js';
import { gameRouter } from './game.js';
import { recordsRouter } from './records.js';
import { userRouter } from './user.js';
import { crewRouter } from './crew.js';
export const indexRouter = express.Router();

indexRouter.use('/user',userRouter);
indexRouter.use('/game',gameRouter);
indexRouter.use('/auth',authRouter);
indexRouter.use('/records',recordsRouter);
indexRouter.use('/crew',crewRouter);