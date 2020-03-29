const express = require('express');
const app = express();
const morgan = require('morgan');
const postRoutes = require('./routes/postRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Mounting Routes
app.use('/api/v1/posts', postRoutes);

module.exports = app;
