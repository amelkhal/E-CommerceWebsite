import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrderStatus } from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new order (requires authentication)
router.post('/', authMiddleware, createOrder);

// Route to get all orders for the authenticated user (requires authentication)
router.get('/', authMiddleware, getOrders);

// Route to get an order by ID (requires authentication)
router.get('/:id', authMiddleware, getOrderById);

// Route to update the status of an order by ID (requires authentication)
router.put('/:id/status', authMiddleware, updateOrderStatus);

export default router;
