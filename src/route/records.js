import express from 'express';
import { loginCheckMiddleWare } from '../middleware/loginCheck.middleware.js';
import { getUserRecords } from '../api/record/controller/record.controller.js';
export const recordsRouter = express.Router();

recordsRouter.get('/',loginCheckMiddleWare,getUserRecords);