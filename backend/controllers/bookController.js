const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(500).send('Server Error');
  }
};

exports.createBook = async (req, res) => {
  const { title, author, description, price, countInStock } = req.body;

  // Basic validation
  if (!title || !author || !price) {
    return res.status(400).json({ message: 'Title, author, and price are required' });
  }

  try {
    const newBook = new Book({
      title,
      author,
      description,
      price,
      countInStock
    });
    const book = await newBook.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateBook = async (req, res) => {
  const { title, author, description, price, countInStock } = req.body;

  // Basic validation
  if (!title && !author && !price && countInStock === undefined) {
    return res.status(400).json({ message: 'At least one field is required to update' });
  }

  try {
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.price = price || book.price;
    book.countInStock = countInStock !== undefined ? countInStock : book.countInStock;

    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(500).send('Server Error');
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await book.remove();
    res.json({ message: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(500).send('Server Error');
  }
};
