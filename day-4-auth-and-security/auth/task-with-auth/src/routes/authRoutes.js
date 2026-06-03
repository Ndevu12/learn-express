import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimitMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.get('/me', authenticateToken, getMe);

export default router;
