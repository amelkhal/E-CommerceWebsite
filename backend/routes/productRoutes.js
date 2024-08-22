const express = require('express');
const router = express.Router();

// Sample product data
const products = [
  { id: 1, name: 'Book 1', description: 'Description 1' },
  { id: 2, name: 'Book 2', description: 'Description 2' }
];

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get a single product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
