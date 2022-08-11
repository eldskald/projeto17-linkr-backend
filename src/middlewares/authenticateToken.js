import { authRepository } from "../repositories/authRepository.js";
import jwt from "jsonwebtoken"

export async function validateToken(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("No token."); // unauthorized
  }

  const secretKey=process.env.JWT_SECRET;
  
  try {
    const userData = jwt.verify(token, secretKey)
    const user= await authRepository.getUser(userData.userId);
  
    res.locals.user = user;
    return next();
    
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); // server error
  }  
}