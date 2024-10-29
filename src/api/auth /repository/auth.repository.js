import Game from "../../../../model/game.js";
import Record from "../../../../model/record.js";
import User from "../../../../model/user.js"


export class AuthRepository {
    async createUser(signupDTO){
        try{
            return await User.create({signupDTO});
        }catch(err){
            throw err;
        }
    }
    async findByUserName(username){
        try{
            return await User.findOne({ username: username });
        }catch(err){
            throw err;
        }
    }
    async findByUserNickName(nickname){
        try{
            return await User.findOne({ nickname: nickname });
        }catch(err){
            throw err;
        }
    }
    async findByUserNameAndNotRemove(signinDTO){
        try{
            return await User.findOne({ username: signinDTO.username, removed: null});
        }catch(err){
            throw err;
        }
    }

    async save(user){
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