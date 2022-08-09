import { Router } from "express";
import { signUp } from "../controller/authController.js";
import userSchema from "../schemas/userSchema.js";
import schemaValidation from "../middlewares/schemaValidation.js";

const authRouter = Router()

authRouter.post('/signup', schemaValidation(userSchema), signUp)

export default authRouter