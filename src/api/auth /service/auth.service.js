import { AuthRepository } from "../repository/auth.repository.js"
import jwt from 'jsonwebtoken';

export class AuthService {
    constructor(){
        this.authRepository = new AuthRepository();
    }

    async existNickname(nickname){
        try{
            const existNickname = await this.authRepository.findByUserName(nickname);
            if(existNickname){
                return true;
            }
            return false;
        }catch(err){
            throw err; 
        }
    }

    async signup(username,nickname,birth,gender,fcm){ // DTO로 변환 
        try{
            const existUser = await this.authRepository.findByUserName(username);
            if(existUser){
                throw new Error('EXIST_USER');
            }

            const user = await this.authRepository.createUser(username,nickname,birth,gender,fcm);
            
            user.token = jwt.sign({
                authed: user._id,
                birth,
            }, "12345" /* process.env 로 변경 */ , { 
                expiresIn: '5m' 
            });

            return user;
        }catch(err){
            throw err;
        }
    }

    async signin(username,fcm){
        const existUser = await this.authRepository.findByUserNameAndNotRemove(username);
        if(!existUser){
            throw new Error('NOT_EXIST_USER');
        }

        let now = Date.now()
        let diff = (now / 86400000 | 0) - (existUser.signin / 86400000 | 0)
        existUser.fcm = req.body.fcm ?? existUser.fcm
        existUser.consecution = diff < 2 ? existUser.consecution + diff : 1
        existUser.signin = now
        await existUser.save();

        existUser.token = jwt.sign({
            authed: user._id,
            birth,
        }, "12345" /* process.env 로 변경 */ , { 
            expiresIn: '5m' 
        });

        return existUser;
    }
}