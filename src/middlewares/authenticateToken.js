import { authRepository } from "../repositories/authRepository.js";
<<<<<<< HEAD
import jwt from "jsonwebtoken"
=======
import jwt from "jsonwebtoken";
>>>>>>> origin/authBranch

export async function validateToken(req, res, next) {
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
      return next();
    }
    catch{
        return res.status(401).send("Invalid Session")
    };
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); // server error
  }  
}