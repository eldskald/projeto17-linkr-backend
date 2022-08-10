import { Router } from 'express';
import authRouter from './authRouter.js';
import editionPost from './editionPost.js';

const router = Router();

router.use(authRouter)
router.use(editionPost)

export default router;
