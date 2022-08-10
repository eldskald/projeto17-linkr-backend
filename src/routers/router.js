import { Router } from 'express';
import testeRouter from './teste.js';
import authRouter from './authRouter.js';

const router = Router();

router.use(testeRouter)
router.use(authRouter)

export default router;
