import { Router } from 'express';
import { searchFor } from '../controller/searchController.js';

const router = Router();
router.get('/search', searchFor);
export default router;
