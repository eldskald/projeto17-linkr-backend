import { Router } from 'express';
import testeRouter from './teste.js';

const router = Router();

router.use(testeRouter)

export default router;
