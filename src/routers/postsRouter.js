import { Router } from 'express';
import { unlike, listPosts, newLike, newPost, getNames, listPostsByUser, newPosts } from '../controller/postsController.js';
import { validateToken } from '../middlewares/authenticateToken.js';
import schemaValidation from '../middlewares/schemaValidation.js';
import postSchema from '../schemas/postSchema.js';

const router = Router();
router.get('/posts', validateToken, listPosts); // With query strings limit and amount
router.get('/posts/:id',validateToken,listPostsByUser);
router.post('/posts', validateToken, schemaValidation(postSchema), newPost);
router.post('/like', validateToken,newLike);
router.post('/unlike',validateToken,unlike);
router.post('/likernames',validateToken,getNames);
router.get('/posts/time/:time',validateToken, newPosts);
export default router;
