import express from 'express';
import { getCartItems, updateCart, clearCart } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getCartItems);  // Get cart items for logged-in user
router.put('/', authMiddleware, updateCart);  // Update cart items
router.delete('/', authMiddleware, clearCart);  // Clear cart after checkout

export default router;
