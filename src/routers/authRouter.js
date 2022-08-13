import { Router } from "express";
import { signIn, signUp,getUser,getUserById } from "../controller/authController.js";
import userSchema from "../schemas/userSchema.js";
import schemaValidation from "../middlewares/schemaValidation.js";
import logInSchema from "../schemas/signInSchema.js";
import { validateToken } from "../middlewares/authenticateToken.js";

const authRouter = Router()

authRouter.post('/signup', schemaValidation(userSchema), signUp)
authRouter.post('/signin', schemaValidation(logInSchema), signIn)
authRouter.get('/getuser', validateToken, getUser)
authRouter.get('/getuser/:id', validateToken, getUserById)



export default authRouter