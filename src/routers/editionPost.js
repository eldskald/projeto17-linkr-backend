import { Router } from "express";
import { editionController } from "../controller/editionController.js";
import { validateToken } from "../middlewares/authenticateToken.js";

const editionPost = Router()

editionPost.post('/edit/:id', validateToken, editionController)

export default editionPost
