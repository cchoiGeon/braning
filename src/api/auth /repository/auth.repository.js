import Game from "../../../../model/game.js";
import Record from "../../../../model/record.js";
import User from "../../../../model/user.js"


export class AuthRepository {
    async createUser(username,nickname,birth,gender,fcm){
        try{
            return await User.create({
                username: username,
                nickname: nickname.trim(),
                birth: birth,
                gender: gender,
                fcm: fcm ?? undefined,
            });
        }catch(err){
            throw err;
        }
    }
    async findByUserName(username){
        try{
            return await User.findOne({ username: username.trim() });
        }catch(err){
            throw err;
        }
    }
    async findByUserNickName(nickname){
        try{
            return await User.findOne({ nickname: nickname.trim() });
        }catch(err){
            throw err;
        }
    }
    async findByUserNameAndNotRemove(username){
        try{
            return await User.findOne({ username: username.trim(), removed: null});
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

    async updateUser(userId,nickname,fcm){
        try{
            return await User.findOneAndUpdate({ _id: userId, removed: null }, {
                nickname: nickname ?? undefined,
                fcm: fcm ?? undefined,
            }, { new: true });
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