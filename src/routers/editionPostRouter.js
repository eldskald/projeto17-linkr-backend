import { Router } from "express";
import { editionController } from "../controller/editionController.js";
import { validateToken } from "../middlewares/authenticateToken.js";
import schemaValidation from "../middlewares/schemaValidation.js";
import postEdit from "../schemas/editSchema.js";

const editionPost = Router()

editionPost.put('/edit/:id',   validateToken,
                                schemaValidation(postEdit), 
                                editionController)

export default editionPost
