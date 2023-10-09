const BorrowedBooks = require('../models/BorrowedBooks');

// List all books
exports.getAllBorrowedBooks = async (req, res) => {
    try {
        const borrowedBooks = await BorrowedBooks.findAll();

        res.status(200).json({ borrowedBooks });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch borrowed Books' });
    }
};
