import { Router } from "express";
import { testeCountroler } from "../countrollers/testeCountroller.js";

const testeRouter = Router()

testeRouter.get('/teste', testeCountroler)

export default testeRouter