import { AuthService } from "../service/auth.service.js";

const authService = new AuthService();

export async function existNickname(req,res) {
    try{
        const {nickname} = req.params;
        if(!nickname){
            return res.status(400).send(' nickname is required.');
        }
        const result = await authService.existNickname(nickname);
        return res.status(200).json({ res: result });
    }catch(err){
        return res.status(500).send('Internal server error.');
    }
}

export async function signup(req,res){
    try{
        const {username,nickname,birth,gender,fcm} = req.body;
        console.log(username,nickname,birth,gender,fcm);
        if (!username || !nickname)
            return res.status(400).send('(username, nickname) is required.')
        
        const user = await authService.signup(username,nickname,birth,gender,fcm);
        return res.status(201).json(user)
    }catch(err){
        console.log(err);
        if (err.message === 'EXIST_USER') {
            return res.status(409).send('user already exists.');
        }
        return res.status(500).send('Internal server error.');
    }
}


export async function signin(req,res){
    try {
        const {username, fcm} = req.body;
        if (!username)
            return res.status(400).send('(username) is required.');
        
        const user = await authService.signin(username,fcm);

        return res.status(200).json(user);
    } catch (e) {
        console.log(err);
        if (err.message === 'NOT_EXIST_USER') {
            return res.status(401).send('unauthorized.');
        }
        return res.status(500).send('Internal server error.');
    }
}