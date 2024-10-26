import express from 'express';
import { saveGameResult } from '../api/game/controller/game.controller.js';
import { loginCheckMiddleWare } from '../middleware/loginCheck.middleware.js';
export const gameRouter = express.Router();

gameRouter.post('/:gameCode',loginCheckMiddleWare,saveGameResult);