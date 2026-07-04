/**
 * Catches any request that didn't match a route and returns a
 * consistent JSON 404 instead of Express's default HTML page.
 */
function notFound(req, res, _next) {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: `No route matches ${req.method} ${req.originalUrl}`,
  });
}

module.exports = notFound;
