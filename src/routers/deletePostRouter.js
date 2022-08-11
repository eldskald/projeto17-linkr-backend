import { Router } from "express";
import postEdit from "../schemas/editSchema.js";

const deletePostRouter = Router()

deletePostRouter.delete('/delete/:id',   validateToken,
                                schemaValidation(postEdit), 
                                editionController)

export default deletePostRouter
