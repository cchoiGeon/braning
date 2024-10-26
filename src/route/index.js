import express from 'express';
import { authRouter } from './auth.js';
import { gameRouter } from './game.js';
import { recordsRouter } from './records.js';
export const indexRouter = express.Router();

indexRouter.use('/game',gameRouter);
indexRouter.use('/auth',authRouter);
indexRouter.use('/records',recordsRouter);