const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to create a new order (requires authentication)
router.post('/', authMiddleware, createOrder);

// Route to get all orders for the authenticated user (requires authentication)
router.get('/', authMiddleware, getOrders);

// Route to get an order by ID (requires authentication)
router.get('/:id', authMiddleware, getOrderById);

// Route to update the status of an order by ID (requires authentication)
router.put('/:id/status', authMiddleware, updateOrderStatus);

module.exports = router;
