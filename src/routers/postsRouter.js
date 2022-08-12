import { Router } from 'express';
import { listPosts, newPost } from '../controller/postsController.js';
import { validateToken } from '../middlewares/authenticateToken.js';
import schemaValidation from '../middlewares/schemaValidation.js';
import postSchema from '../schemas/postSchema.js';

const router = Router();
router.get('/posts', validateToken, listPosts); // With query strings limit and amount
router.post('/posts', validateToken, schemaValidation(postSchema), newPost);
export default router;
