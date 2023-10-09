const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ISBN: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  shelfLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Book;