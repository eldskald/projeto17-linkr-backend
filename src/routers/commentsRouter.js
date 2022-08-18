import { Router } from 'express';
import { getComments } from '../controller/commentsController.js';
import { validateToken } from '../middlewares/authenticateToken.js';

const router = Router();
router.get('/comments/:postId', validateToken, getComments)
export default router;
