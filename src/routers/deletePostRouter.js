import { Router } from "express";
import { deletePostController } from "../controller/deletePostController.js";
import { validateToken } from "../middlewares/authenticateToken.js";

const deletePost = Router()

deletePost.delete('/delete/:id',  validateToken, deletePostController )

export default deletePost
