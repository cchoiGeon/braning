import jwt from "jsonwebtoken";
import logger from "../util/logging.js";

export async function loginCheckMiddleWare(req,res,next){
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization header with Bearer token is required.' });
        }
        const token = authHeader.split(' ')[1];
    
        const decoded = jwt.verify(token, process.env.JWT);

        res.locals.userId = decoded.userId;
        res.locals.birth = decoded.birth;

        next();
    }catch(err){
        logger.warn("MiddleWare/LoginCheck Error : ",err);
        return res.status(500).send('Internal server error.');
    }
}