import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/profileController.js';
import protect from '../middlewares/authMiddleware.js'; // Ensures the user is authenticated

const router = express.Router();

// Protects both get and update profile routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
