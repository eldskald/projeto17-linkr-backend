import { authRepository } from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";

export async function validateToken(req, res, next) {
  console.log('entrei validate')
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("No token."); // unauthorized
  }
  const secretKey=process.env.JWT_SECRET;
  
  try {
    try{
      const userData = jwt.verify(token,secretKey)
      res.locals.userId = userData.userId;
      next();
    }
    catch{
        return res.status(401).send("Invalid Session")
    };
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); // server error
  }  
}