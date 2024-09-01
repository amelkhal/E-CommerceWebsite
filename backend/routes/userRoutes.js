import express from 'express';
import asyncHandler from 'express-async-handler';
import { getUserProfile, updateUserProfile } from '../controllers/profileController.js';
import protect from '../middlewares/authMiddleware.js'; // Import default export

const router = express.Router();

router.route('/profile')
    .get(protect, asyncHandler(getUserProfile))
    .put(protect, asyncHandler(updateUserProfile));

export default router;
