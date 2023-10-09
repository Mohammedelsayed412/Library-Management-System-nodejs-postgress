const Book = require('../models/Book');

exports.addBook = async (req, res) => {
    try {
        const { title, author, ISBN, quantity, shelfLocation } = req.body;
        const book = await Book.create({
            title,
            author,
            ISBN,
            quantity,
            shelfLocation,
        });
        res.status(201).json({ book });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add the book' });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, ISBN, quantity, shelfLocation } = req.body;
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        book.title = title;
        book.author = author;
        book.ISBN = ISBN;
        book.quantity = quantity;
        book.shelfLocation = shelfLocation;
        await book.save();
        res.status(200).json({ book });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update the book' });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        await book.destroy();
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete the book' });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json({ books });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

exports.searchBooks = async (req, res) => {
    try {
        const { title, author, ISBN } = req.query;
        let searchConditions = {};
        if (title || author || ISBN) {
            if (title) {
                searchConditions.title = title;
            }
            if (author) {
                searchConditions.author = author;
            }
            if (ISBN) {
                searchConditions.ISBN = ISBN;
            }
        }

        const books = await Book.findAll({
            where: searchConditions,
        });
        res.status(200).json({ books });
    } catch (err) {
        res.status(500).json({ error: 'Failed to search for books' });
    }
};