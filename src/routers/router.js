import { Router } from 'express';
import authRouter from './authRouter.js';
import postsRouter from './postsRouter.js';
import editionPost from './editionPost.js';

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(editionPost);

export default router;
