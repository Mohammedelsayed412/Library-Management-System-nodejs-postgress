const BorrowedBooks = require('../models/BorrowedBooks');
const { Op } = require('sequelize');
const xlsx = require('xlsx');

exports.getAllBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await BorrowedBooks.findAll();
    res.status(200).json({ borrowedBooks });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch borrowed Books' });
  }
};


exports.exportOverdueBorrowedBooksBase64 = async (req, res, next) => {
  try {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const overdueBorrows = await BorrowedBooks.findAll({
      where: {
        dueDate: {
          [Op.lt]: new Date(),
        }
      },
      include: ['Book', 'Borrower'],
    });

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(overdueBorrows);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Overdue Borrows');
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const base64String = buffer.toString('base64');
    res.send({
      excelData: base64String,
    });
  } catch (error) {
    next(error);
  }
};

exports.exportOverdueBorrowedBooksXlsx = async (req, res, next) => {
  try {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const overdueBorrows = await BorrowedBooks.findAll({
      where: {
        dueDate: {
          [Op.lt]: new Date(),
        }
      },
      include: ['Book', 'Borrower'],
    });

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(overdueBorrows);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Overdue Borrows');
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const base64String = buffer.toString('base64');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="overdue_borrows.xlsx"');
    res.send(Buffer.from(base64String, 'base64'));
  } catch (error) {
    next(error);
  }
};

