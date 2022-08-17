import { Router } from 'express';
import authRouter from './authRouter.js';
import deletePost from './deletePostRouter.js';
import postsRouter from './postsRouter.js';
import editionPost from './editionPostRouter.js';
import hashtagRouter from './hashtagRouter.js';
import searchRouter from './searchRouter.js';
import repostRouter from './repostsRouter.js'
import followRouter from './followRouter.js';


const router = Router();

router.use(authRouter)
router.use(editionPost)
router.use(deletePost)
router.use(postsRouter);
router.use(hashtagRouter);
router.use(searchRouter);
router.use(repostRouter)
router.use(followRouter);

export default router;

