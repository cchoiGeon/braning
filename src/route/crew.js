import express from 'express';
import { loginCheckMiddleWare } from '../middleware/loginCheck.middleware.js';
import { createCrew, getUserCrews, joinCrewWithPassword } from '../api/crew/controller/crew.controller.js';
export const crewRouter = express.Router();

crewRouter.get('/',loginCheckMiddleWare,getUserCrews);
crewRouter.post('/',loginCheckMiddleWare,createCrew);
crewRouter.post('/join',loginCheckMiddleWare,joinCrewWithPassword);