import { Router } from 'express';
import { newRepost} from '../controller/repostsController.js';
import { validateToken } from '../middlewares/authenticateToken.js';

const router = Router();
router.post('/repost/:postId', validateToken, newRepost); // With query strings limit and amount
export default router;