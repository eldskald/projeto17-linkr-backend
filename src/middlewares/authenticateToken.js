import { authRepository } from "../repositories/authRepository.js";

export async function validateToken(req, res, next) {
  console.log('entrei aqui')
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  console.log('token :', token)

  if (!token) {
    return res.status(401).send("No token."); // unauthorized
  }
  const secretKey=process.env.JWT_SECRET;
  console.log('secretKey :', secretKey)
  try {
    try{
      const userData = jwt.verify(token, secretKey);
    }
    catch{
        return res.status(401).send("Invalid Session")
    };
    const user= await authRepository.getUser(userData.userId);
  
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); // server error
  }  
}