import { Router } from 'express';
import { follow, unfollow } from '../controller/followController.js';
import { validateToken } from '../middlewares/authenticateToken.js';

const router = Router();
router.post('/follow/:id', validateToken, follow);
router.delete('/unfollow/:id', validateToken, unfollow);
export default router;
