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

    async signup(signupDTO){ // DTO로 변환 
        try{
            const existUser = await this.authRepository.findByUserName(signupDTO.username);
            if(existUser){
                throw new Error('EXIST_USER');
            }

            const user = await this.authRepository.createUser(signupDTO);
            
            user.token = jwt.sign({
                userId: user._id,
                birth: user.birth,
            }, process.env.JWT, { 
                expiresIn: '50m' 
            });

            return user;
        }catch(err){
            throw err;
        }
    }

    async signin(signinDTO){
        try{
            const existUser = await this.authRepository.findByUserNameAndNotRemove(signinDTO);
            if(!existUser){
                throw new Error('NOT_EXIST_USER');
            }
    
            let now = Date.now();
            let diff = (now / 86400000 | 0) - (existUser.signin / 86400000 | 0) // 마지막으로 로그인한 날과 오늘의 차이를 일단위로 구함
            existUser.fcm = signinDTO.fcm ?? existUser.fcm
            existUser.consecution = diff < 2 ? existUser.consecution + diff : 1 // 마지막으로 로그인한 날과 오늘의 차이가 2일을 넘지 않는다면 연속 출석일 + 마지막으로 로그인한 날과 오늘의 차이 (만약 하루를 넘지 않는다면 +1을 하면 안되니 + diff로 함)
            existUser.signin = now; // 마지막 로그인을 오늘로 표시 

            await this.authRepository.save(existUser);

            existUser.token = jwt.sign({
                userId: existUser._id,
                birth: existUser.birth,
            }, process.env.JWT , { 
                expiresIn: '50m' 
            });
    
            return existUser;
        }catch(err){
            throw err;
        }
    }

    async updateUser(userId,updateUserDTO){
        try {
            const existUser = await this.authRepository.updateUser(userId,updateUserDTO);
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