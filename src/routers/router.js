import { Router } from 'express';
import authRouter from './authRouter.js';
import deletePost from './deletePostRouter.js';
import postsRouter from './postsRouter.js';
import editionPost from './editionPostRouter.js';
import hashtagRouter from './hashtagRouter.js';
import searchRouter from './searchRouter.js';

const router = Router();

router.use(authRouter)
router.use(editionPost)
router.use(deletePost)
router.use(postsRouter);
router.use(hashtagRouter);
router.use(searchRouter);

export default router;

