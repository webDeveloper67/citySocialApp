const express = require('express');
const app = express();
const morgan = require('morgan');
const ErrorResponse = require('./helpers/ErrorResponse');
const ErrorController = require('./controllers/errorController');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Mounting Routes
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', userRoutes);

// Unhandled routes
app.all('*', async (req, res, next) => {
  next(
    new ErrorResponse(`Can not find ${req.originalUrl} on the server!`, 404)
  );
});

// Express Error middlewares
app.use(ErrorController);

module.exports = app;
