const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const bookController = require('../controllers/bookController');

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Add a book
router.post('/', limiter, bookController.addBook);

// Update a book
router.put('/:id', bookController.updateBook);

// Delete a book
router.delete('/:id', bookController.deleteBook);

// List all books
router.get('/', limiter, bookController.getAllBooks);

// Search for a book
router.get('/search', bookController.searchBooks);

module.exports = router;