const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const borrowerController = require('../controllers/borrowerController');

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Register a borrower
router.post('/', limiter, borrowerController.registerBorrower);

// Update a borrower
router.put('/:id', borrowerController.updateBorrower);

// Delete a borrower
router.delete('/:id', borrowerController.deleteBorrower);

// List all borrowers
router.get('/', limiter, borrowerController.getAllBorrowers);

// Check out a book
router.post('/:borrowerId/checkout', borrowerController.checkoutBook);

// Return a book
router.post('/:borrowerId/return', borrowerController.returnBook);

// Get borrowed books for a borrower
router.get('/:borrowerId/books', borrowerController.getBorrowedBooks);

// Get overdue books
router.get('/overdue', borrowerController.getOverdueBooks);


module.exports = router;