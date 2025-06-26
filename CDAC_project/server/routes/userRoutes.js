import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  getUserBySharingCode,
  regenerateSharingCode,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/code/:code', protect, getUserBySharingCode);
router.put('/regenerate-code', protect, regenerateSharingCode);

export default router;