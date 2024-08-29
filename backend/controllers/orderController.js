const Order = require('../models/Order');
const Book = require('../models/Book');

// Create an order
exports.createOrder = async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  // Basic validation
  if (!items || items.length === 0 || !shippingAddress || !paymentMethod) {
    return res.status(400).json({ message: 'Items, shipping address, and payment method are required' });
  }

  try {
    // Calculate total price and check stock
    let totalPrice = 0;
    for (let item of items) {
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
      items,
      shippingAddress,
      paymentMethod,
      totalPrice
    });

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all orders for a user
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update the status of an order
exports.updateOrderStatus = async (req, res) => {
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
    if (order.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).send('Server Error');
  }
};
