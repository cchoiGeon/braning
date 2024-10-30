import { signinSchema, signupSchema } from "../../../vaild/auth.vaild.js";
import { SigninDTO, SignupDTO } from "../dto/auth.dto.js";
import { AuthService } from "../service/auth.service.js";

const authService = new AuthService();

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