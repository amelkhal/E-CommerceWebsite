import mongoose from 'mongoose';

// Schema for individual reviews
const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // Rating must be between 1 and 5
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Schema for books
const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
    trim: true, // Trims leading and trailing whitespace
  },
  author: {
    type: String,
    required: true,
    trim: true, // Trims leading and trailing whitespace
  },
  image: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true, // Trims leading and trailing whitespace
  },
  description: {
    type: String,
    required: true,
    trim: true, // Trims leading and trailing whitespace
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    default: 0,
    min: 0, // Rating should be non-negative
    max: 5, // Rating should not exceed 5
  },
  numReviews: {
    type: Number,
    default: 0,
    min: 0, // Number of reviews should be non-negative
  },
  price: {
    type: Number,
    required: true,
    default: 0,
    min: 0, // Price should be non-negative
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
    min: 0, // Stock count should be non-negative
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
