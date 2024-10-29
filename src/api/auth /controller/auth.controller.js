import { nicknameSchema, signinSchema, signupSchema, updateUserSchema } from "../../../vaild/auth.vaild.js";
import { SigninDTO, SignupDTO, UpdateUserDTO } from "../dto/auth.dto.js";
import { AuthService } from "../service/auth.service.js";

const authService = new AuthService();

export async function existNickname(req,res) {
    try{
        const { error, value } = nicknameSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ errorMessage: error.details[0].message });
        }
        
        const result = await authService.existNickname(value.nickname);

        return res.status(200).json({ res: result });
    }catch(err){
        return res.status(500).send('Internal server error.');
    }
}

export async function signup(req,res){
    try{
        const { error, value } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ errorMessage: error.details[0].message });
        }

        const signupDTO = new SignupDTO(value);

        const user = await authService.signup(signupDTO);

        return res.status(201).json(user)
    }catch(err){
        console.error(err);
        if (err.message === 'EXIST_USER') {
            return res.status(409).send('user already exists.');
        }
        return res.status(500).send('Internal server error.');
    }
}


export async function signin(req,res){
    try {
        const { error, value } = signinSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ errorMessage: error.details[0].message });
        }

        const signinDTO = new SigninDTO(value);

        const user = await authService.signin(signinDTO);

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        if (err.message === 'NOT_EXIST_USER') {
            return res.status(401).send('unauthorized.');
        }
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

        const user = await authService.updateUser(res.locals.authed,updateUserDTO);
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
        await authService.deleteUser(userId);
        return res.status(200).send();
    }catch(err){
        console.error(err);
        if(err.message == 'NOT_EXIST_USER'){
            return res.status(401).send('unauthorized.');
        }
        return res.status(500).send('Internal server error.');
    }
}