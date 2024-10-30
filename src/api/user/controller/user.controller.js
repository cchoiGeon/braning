import { nicknameSchema, updateUserSchema } from "../../../vaild/auth.vaild.js";
import { UpdateUserDTO } from "../dto/user.dto.js";
import { UserService } from "../service/user.service.js";

const userService = new UserService();

export async function existNickname(req,res) {
    try{
        const { error, value } = nicknameSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ errorMessage: error.details[0].message });
        }
        
        const result = await userService.findUserByNickName(value.nickname);

        return res.status(200).json({ res: result });
    }catch(err){
        return res.status(500).send('Internal server error.');
    }
}

export async function updateUser(req,res){
    try {
        const { error, value } = updateUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ errorMessage: error.details[0].message });
        }

        const updateUserDTO = new UpdateUserDTO(value);

        const user = await userService.updateUser(res.locals.authed,updateUserDTO);
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        if(err.message == 'NOT_EXIST_USER'){
            return res.status(401).send('unauthorized.');
        }
        return res.status(500).send('Internal server error.');
    }
}

export async function deleteUser(req,res){
    try{
        const userId = res.locals.authed;
        await userService.deleteUser(userId);
        return res.status(200).send();
    }catch(err){
        console.error(err);
        if(err.message == 'NOT_EXIST_USER'){
            return res.status(401).send('unauthorized.');
        }
        return res.status(500).send('Internal server error.');
    }
}