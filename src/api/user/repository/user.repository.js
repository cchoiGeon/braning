import Game from "../../../../model/game.js";
import Record from "../../../../model/record.js";
import User from "../../../../model/user.js"


export class UserRepository {
    async createUser(signupDTO){
        try{
            return await User.create({signupDTO});
        }catch(err){
            throw err;
        }
    }
    async findUserByUserName(username){
        try{
            return await User.findOne({ username: username });
        }catch(err){
            throw err;
        }
    }
    async findUserByNickName(nickname){
        try{
            return await User.findOne({ nickname: nickname });
        }catch(err){
            throw err;
        }
    }
    async findUserByNameAndNotRemove(signinDTO){
        try{
            return await User.findOne({ username: signinDTO.username, removed: null});
        }catch(err){
            throw err;
        }
    }

    async saveUser(user){
        try{
            await user.save();
        }catch(err){
            throw err;
        }
    }

    async updateUser(userId,updateUserDTO){
        try{
            return await User.findOneAndUpdate({ _id: userId, removed: null }, {
                nickname: updateUserDTO.nickname,
                fcm: updateUserDTO.fcm,
            }, { 
                new: true
            });
        }catch(err){
            throw err;
        }
    }
    
    async deleteUser(userId){
        try{
            return await User.findOneAndUpdate({ _id: userId, removed: null }, {
                username: 'removed.' + userId,
                fcm: null,
                removed: Date.now(),
            });
        }catch(err){
            throw err;
        }
    }

    async deleteData(userId){
        try{
            await Game.deleteMany({ user: userId });
            await Record.deleteMany({ user: userId });
        }catch(err){
            throw err;
        }
    }
}   