import { AuthRepository } from "../repository/auth.repository.js"
import jwt from 'jsonwebtoken';

export class AuthService {
    constructor(){
        this.authRepository = new AuthRepository();
    }

    async existNickname(nickname){
        try{
            const existNickname = await this.authRepository.findByUserNickName(nickname);
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
        try{
            const existUser = await this.authRepository.findByUserNameAndNotRemove(username);
            if(!existUser){
                throw new Error('NOT_EXIST_USER');
            }
    
            let now = Date.now();
            let diff = (now / 86400000 | 0) - (existUser.signin / 86400000 | 0) // 마지막으로 로그인한 날과 오늘의 차이를 일단위로 구함
            existUser.fcm = fcm ?? existUser.fcm
            existUser.consecution = diff < 2 ? existUser.consecution + diff : 1 // 마지막으로 로그인한 날과 오늘의 차이가 2일을 넘지 않는다면 연속 출석일 + 마지막으로 로그인한 날과 오늘의 차이 (만약 하루를 넘지 않는다면 +1을 하면 안되니 + diff로 함)
            existUser.signin = now; // 마지막 로그인을 오늘로 표시 

            await this.authRepository.save(existUser);

            existUser.token = jwt.sign({
                authed: existUser._id,
                birth: existUser.birth,
            }, "12345" /* process.env 로 변경 */ , { 
                expiresIn: '50m' 
            });
    
            return existUser;
        }catch(err){
            throw err;
        }
    }

    async updateUser(userId,fcm,nickname){
        try {
            const existUser = await this.authRepository.updateUser(userId,fcm,nickname);
            if(!existUser){
                throw new Error('NOT_EXIST_USER');
            }
            return existUser;
        } catch (err) {
            throw err;
        }
    }

    async deleteUser(userId){
        try{
            const existUser = await this.authRepository.deleteUser(userId);
            if(!existUser){
                throw new Error('NOT_EXIST_USER');
            }
            await this.authRepository.deleteData(userId);
        }catch(err){
            throw err;
        }
    }
}