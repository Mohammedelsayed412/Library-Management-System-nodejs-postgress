const { Sequelize } = require('sequelize');

// Load environment variables from .env file
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false,
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      console.log('Database connection has been established successfully.');
    }
  })
  .catch((error) => {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Unable to connect to the database:', error);
    }
  });

module.exports = sequelize;