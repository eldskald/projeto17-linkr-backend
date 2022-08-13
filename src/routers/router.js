import { Router } from 'express';
import authRouter from './authRouter.js';
import postsRouter from './postsRouter.js';
import editionPost from './editionPost.js';
import hashtagRouter from './hashtagRouter.js';
import searchRouter from './searchRouter.js';

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(editionPost);
router.use(hashtagRouter);
router.use(searchRouter);

export default router;

