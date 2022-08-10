import { Router } from "express";
import { testeCountroler } from "../controllers/testeController.js";

const editionPost = Router()

editionPost.get('/teste', testeCountroler)

export default editionPost