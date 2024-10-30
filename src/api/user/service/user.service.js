import { UserRepository } from "../repository/user.repository.js";

export class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }   
    async findUserByNameAndNotRemove(signinDTO){
        try{
            return await this.userRepository.findUserByNameAndNotRemove(signinDTO)
        }catch(err){
            throw err;
        }
    }

    async findUserByUserName(username){
        try{
            return await this.userRepository.findUserByUserName(username);
        }catch(err){
            throw err; 
        }
    }

    async findUserByNickName(nickname){
        try{
            const existNickname = await this.userRepository.findUserByNickName(nickname);
            if(existNickname){
                return true;
            }
            return false;
        }catch(err){
            throw err; 
        }
    }

    async saveUser(user){
        try{
            return await this.userRepository.saveUser(user)
        }catch(err){
            throw err;
        }
    }

    async updateUser(userId,updateUserDTO){
        try {
            const existUser = await this.userRepository.updateUser(userId,updateUserDTO);
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
            const existUser = await this.userRepository.deleteUser(userId);
            if(!existUser){
                throw new Error('NOT_EXIST_USER');
            }
            await this.userRepository.deleteData(userId);
        }catch(err){
            throw err;
        }
    }

    async createUser(signupDTO){
        try{
            return await this.userRepository.createUser(signupDTO);
        }catch(err){
            throw err;
        }
    }
}