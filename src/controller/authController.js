import { authRepository } from "../repositories/authRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signUp (req, res){
    try {
        const {email,password,name,pictureUrl} = res.locals.body;
        const alreadyExists=await authRepository.emailCheck(email);
        if(alreadyExists){
            return res.sendStatus(409);
        }
        const hashedPassword = bcrypt.hashSync(password,10)
        await authRepository.signUp(email,hashedPassword,name,pictureUrl);
        return res.sendStatus(201)
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('catch signUp')
    }
}
export async function signIn(req,res){
    try{
        const {email,password}=res.locals.body;
        const user = await authRepository.signIn(email);
        if(user){
            const comparePassword = bcrypt.compareSync(password,user.password);
            if(comparePassword){
                const data = {userId:user.id};
                const secretKey=process.env.JWT_SECRET;
                const token=jwt.sign(data,secretKey);
                await authRepository.newSession(user.id);
                return res.status(200).send(token);
            }
        }
        res.sendStatus(401);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send('catch signIn');
    }
}
export async function getUser(req,res){
    const userId=res.locals.userId    
    try{
    const user= await authRepository.getUser(userId);
    if(user){
        return res.status(200).send(user);
    }
    return res.status(404).send("User not found");
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send('catch signIn');
    }
}
export async function getUserById(req,res){
    const userId=req.params.id; 
    try{
    const user= await authRepository.getUser(userId);
    if(user){
        return res.status(200).send(user);
    }
    return res.status(404).send("User not found");
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send('catch signIn');
    }
}