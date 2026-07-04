/* eslint-disable no-unused-vars */
const config = require('../config');

/**
 * Single place where thrown/forwarded errors become a JSON response.
 * Route handlers and services should `next(err)` rather than
 * formatting error responses themselves.
 */
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const payload = {
    error: err.code || 'INTERNAL_ERROR',
    message: err.message || 'Something went wrong on the AeroTwin API.',
  };
  if (config.env !== 'production' && err.stack) {
    payload.stack = err.stack;
  }
  res.status(status).json(payload);
}

module.exports = errorHandler;
