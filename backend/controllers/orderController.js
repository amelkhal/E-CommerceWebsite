import Order from '../models/Order.js';
import Book from '../models/Book.js';

// Create an order
export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  // Basic validation
  if (!orderItems || orderItems.length === 0 || !shippingAddress || !paymentMethod) {
    return res.status(400).json({ message: 'Order items, shipping address, and payment method are required' });
  }

  try {
    // Calculate total price and check stock
    let totalPrice = 0;
    for (let item of orderItems) {
      const book = await Book.findById(item.book);
      if (!book) {
        return res.status(404).json({ message: `Book not found: ${item.book}` });
      }
      if (book.countInStock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for book: ${book.title}` });
      }
      totalPrice += book.price * item.quantity;
      // Reduce stock
      book.countInStock -= item.quantity;
      await book.save();
    }

    const newOrder = new Order({
      user: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid: false, // Default to not paid
    });

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Error creating order:', err.message);
    res.status(500).send('Server Error');
  }
};

// Get all orders for the logged-in user
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).send('Server Error');
  }
};

// Get a specific order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    res.json(order);
  } catch (err) {
    console.error('Error fetching order:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update the status of an order
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  // Basic validation
  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    // Check if the user is either the owner of the order or an admin
    if (order.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error('Error updating order status:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Get all orders for admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching all orders:', err.message);
    res.status(500).send('Server Error');
  }
};
