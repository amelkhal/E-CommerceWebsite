const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to get all books
router.get('/', getBooks);

// Route to get a book by ID
router.get('/:id', getBookById);

// Route to create a new book (requires authentication)
router.post('/', authMiddleware, createBook);

// Route to update a book by ID (requires authentication)
router.put('/:id', authMiddleware, updateBook);

// Route to delete a book by ID (requires authentication)
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
