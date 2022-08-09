import { Router } from "express";
import { signIn, signUp } from "../controller/authController.js";
import userSchema from "../schemas/userSchema.js";
import schemaValidation from "../middlewares/schemaValidation.js";
import logInSchema from "../schemas/signInSchema.js";

const authRouter = Router()

authRouter.post('/signup', schemaValidation(userSchema), signUp)
authRouter.post('/signin', schemaValidation(logInSchema), signIn)


export default authRouter