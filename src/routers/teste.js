import { Router } from "express";
import { testeControler } from "../controller/testeController.js";

const testeRouter = Router()

testeRouter.get('/teste', testeControler)

export default testeRouter