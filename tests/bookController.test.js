const request = require('supertest');
const app = require('../index');
const sequelize = require('../config/database');


beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

describe('Book Controller', () => {
  test('add a book', async () => {

    const response = await request(app)
      .post('/api/books')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        ISBN: '1234',
        quantity: 7,
        shelfLocation: 'A1',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.book.title).toBe('Test Book');
  });

});