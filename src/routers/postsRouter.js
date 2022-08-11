import { Router } from 'express';
import { listPosts } from '../controller/postsController.js';
import { validateToken } from '../middlewares/authenticateToken.js';

const router = Router();
router.get('/posts', validateToken, listPosts); // With query strings limit and amount
export default router;
