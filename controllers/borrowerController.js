const Borrower = require('../models/Borrower');
const Book = require('../models/Book');
const BorrowedBooks = require('../models/BorrowedBooks');
const { Parser, Json2csvParser } = require('json2csv');
const { Op } = require('sequelize');

const moment = require('moment');

exports.registerBorrower = async (req, res) => {
  try {
    const { name, email } = req.body;
    const borrower = await Borrower.create({
      name,
      email,
    });
    res.status(201).json({ borrower });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register the borrower' });
  }
};

exports.updateBorrower = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const borrower = await Borrower.findByPk(id);
    if (!borrower) {
      return res.status(404).json({ error: 'Borrower not found' });
    }
    borrower.name = name;
    borrower.email = email;
    await borrower.save();
    res.status(200).json({ borrower });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the borrower' });
  }
};

exports.deleteBorrower = async (req, res) => {
  try {
    const { id } = req.params;
    const borrower = await Borrower.findByPk(id);
    if (!borrower) {
      return res.status(404).json({ error: 'Borrower not found' });
    }
    await borrower.destroy();
    res.status(200).json({ message: 'Borrower deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the borrower' });
  }
};

exports.getAllBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.findAll();
    res.status(200).json({ borrowers });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch borrowers' });
  }
};

exports.checkoutBook = async (req, res) => {
  try {
    const { borrowerId } = req.params;
    const { bookId, checkOutDays } = req.body;
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) {
      return res.status(404).json({ error: 'Borrower not found' });
    }
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    if (book.quantity <= 0) {
      return res.status(400).json({ error: 'No available copies of the book' });
    }
    const dueDate = new Date(Date.now() + checkOutDays * 24 * 60 * 60 * 1000)
    const borrowedBook = await BorrowedBooks.create({
      bookId,
      borrowerId,
      dueDate

    });
    book.quantity -= 1;
    await book.save();
    res.status(200).json({ message: 'Book checked out successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check out the book' });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { borrowerId } = req.params;
    const { bookId } = req.body;
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) {
      return res.status(404).json({ error: 'Borrower not found' });
    }
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    const borrowedBook = await BorrowedBooks.findAll({
      where: {
        bookId: bookId || '',
        borrowerId: borrowerId || '',
      },
    });
    if (!borrowedBook) {
      return res.status(404).json({ error: 'Book is not checked out by this borrower' });
    }
    borrowedBook[0].destroy();
    book.quantity += 1;
    await book.save();
    res.status(200).json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to return the book' });
  }
};

exports.getBorrowedBooks = async (req, res) => {
  try {
    const { borrowerId } = req.params;
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) {
      return res.status(404).json({ error: 'Borrower not found' });
    }
    const borrowedBooks = await BorrowedBooks.findAll({
      where: {
        borrowerId: borrowerId || '',
      },
    });
    const bookIds = borrowedBooks.map(borrowedBook => borrowedBook.bookId);
    const books = await Book.findAll({
      where: {
        id: {
          [Op.in]: bookIds,
        },
      },
    });

    res.status(200).json({ books });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch borrowed books' });
  }
};

exports.getOverdueBooks = async (req, res) => {
  try {
    const overdueBooks = await BorrowedBooks.findAll({
      where: {
        dueDate: {
          [Op.lt]: new Date(),
        },
      },
    });
    res.status(200).json({ overdueBooks });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch overdue books' });
  }
};
