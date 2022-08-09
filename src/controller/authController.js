import { authRepository } from "../repositories/authRepository.js";
import bcrypt from 'bcrypt';

export async function signUp (req, res){
    try {
        const {email,password,name,pictureUrl} = req.body
        const alreadyExists=await authRepository.emailCheck(email);
        if(alreadyExists){
            return res.sendStatus(409);
        }
        const hashedPassword = bcrypt.hashSync(password,10)
        await authRepository.signUp(email,hashedPassword,name,pictureUrl);
        return res.sendStatus(201)
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('catch teste')
    }
}