const request = require('supertest');
const app = require('../index');

describe('Book Controller', () => {
  test('should add a book', async () => {
    const response = await request(app)
      .post('/api/books')
      .send({
        title: 'Sample Book',
        author: 'John Doe',
        ISBN: '1234567890',
        quantity: 5,
        shelfLocation: 'A1',
        borrowerId:1
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.book.title).toBe('Sample Book');
    // Add more assertions as needed
  });

  // Add tests for other functions in bookController.js
});