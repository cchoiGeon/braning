import jwt from "jsonwebtoken";

export async function loginCheckMiddleWare(req,res,next){
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization header with Bearer token is required.' });
        }
        const token = authHeader.split(' ')[1];
    
        const decoded = jwt.verify(token, "12345");

        res.locals.authed = decoded.authed;
        res.locals.birth = decoded.birth;

        next();
    }catch(err){
        console.error(err);
        return res.status(500).send('Internal server error.');
    }
}