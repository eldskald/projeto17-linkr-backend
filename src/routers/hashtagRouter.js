import { Router } from 'express';
import { getSingleHashtag, listHashtag } from '../controller/hashtagController.js';
import { validateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/hashtags', listHashtag);
router.get('/hashtags/:hashtag', validateToken, getSingleHashtag);

export default router;
