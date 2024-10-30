import jwt from 'jsonwebtoken';
import { UserService } from "../../user/service/user.service.js";
import { calculateConsecutiveDays, calculateDaysSinceEpoch } from "../../../util/day.js";

export class AuthService {
    constructor(){
        this.userService = new UserService();
    }
    async signup(signupDTO){ // DTO로 변환 
        try{
            const existUser = await this.userService.findUserByUserName(signupDTO.username);
            if(existUser){
                throw new Error('EXIST_USER');
            }

            const user = await this.userService.createUser(signupDTO);
            
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
            const existUser = await this.userService.findUserByNameAndNotRemove(signinDTO);
            if(!existUser){
                throw new Error('NOT_EXIST_USER');
            }
            const nowInDays = calculateDaysSinceEpoch();
            const lastSigninInDays = calculateDaysSinceEpoch(existUser.signin);
    
            // FCM 업데이트 (signinDTO에 fcm 값이 없으면 기존 fcm 유지)
            existUser.fcm = signinDTO.fcm ?? existUser.fcm;
    
            // 연속 출석일 업데이트
            existUser.consecution = calculateConsecutiveDays(lastSigninInDays, nowInDays, existUser.consecution);
    
            // 마지막 로그인 날짜 갱신
            existUser.signin = nowInDays;
            

            await this.userService.saveUser(existUser);

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
}