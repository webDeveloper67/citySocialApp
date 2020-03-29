const ErrorResponse = require('./../helpers/ErrorResponse');

module.exports = (err, req, res, next) => {
  err.httpCode = err.httpCode || 500;
  err.status = err.status || 'error';
};
