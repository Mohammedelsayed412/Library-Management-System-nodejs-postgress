const express = require('express');
const bodyParser = require('body-parser');
const borrowerRoutes = require('./routes/borrowers');
const borrowedBooksRoutes = require('./routes/borrowedBooks');
const bookRoutes = require('./routes/books');
const sequelize = require('./config/database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/borrowers', borrowerRoutes);
app.use('/api/borrowedBooks', borrowedBooksRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });