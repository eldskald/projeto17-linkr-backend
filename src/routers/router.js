import { Router } from 'express';
import authRouter from './authRouter.js';
import deletePost from './deletePostRouter.js';
import postsRouter from './postsRouter.js';
import editionPost from './editionPost.js';

const router = Router();

router.use(authRouter)
router.use(editionPost)
router.use(deletePost)
router.use(postsRouter);

export default router;
