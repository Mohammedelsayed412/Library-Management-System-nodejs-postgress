const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const borrowedBooksController = require('../controllers/borrowedBooksController');

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// List all borrowedBooks
router.get('/', limiter, borrowedBooksController.getAllBorrowedBooks);

module.exports = router;