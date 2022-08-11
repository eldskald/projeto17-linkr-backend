import { Router } from "express";
import { validateToken } from "../middlewares/authenticateToken.js";

const deletePost = Router()

deletePost.delete('/delete/:id',  validateToken )

export default deletePost
