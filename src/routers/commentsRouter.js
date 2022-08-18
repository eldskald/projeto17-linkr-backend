import { Router } from 'express';
import { getComments, newComments } from '../controller/commentsController.js';
import { validateToken } from '../middlewares/authenticateToken.js';
import commentSchema from '../schemas/commentSchema.js';
import schemaValidation from '../middlewares/schemaValidation.js';

const router = Router();
router.get('/comments/:postId', validateToken, getComments)
router.post('/comment/:postId', validateToken,schemaValidation(commentSchema), newComments)

export default router;
