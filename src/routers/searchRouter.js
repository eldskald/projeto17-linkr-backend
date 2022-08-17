import { Router } from 'express';
import { searchFor } from '../controller/searchController.js';
import { validateToken } from '../middlewares/authenticateToken.js';

const router = Router();
router.get('/search', validateToken, searchFor);
export default router;
