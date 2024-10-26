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
}   