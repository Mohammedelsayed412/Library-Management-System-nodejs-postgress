
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./Book');
const Borrower = require('./Borrower');


const BorrowedBooks = sequelize.define('BorrowedBooks', {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: 'id',
      },
    },
    borrowerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Borrower,
        key: 'id',
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  
  module.exports = BorrowedBooks;