const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  items: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book',
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // Ensures quantity is at least 1
      },
    },
  ],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
    min: 0, // Ensures totalPrice is not negative
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create and export the Order model
module.exports = mongoose.model('Order', OrderSchema);
