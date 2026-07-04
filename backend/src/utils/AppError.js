/**
 * Throw this from services/controllers instead of a plain Error so the
 * shared errorHandler middleware can return a correct status code and a
 * stable machine-readable `code` the frontend can branch on.
 *
 *   throw new AppError('Region not found', 404, 'REGION_NOT_FOUND');
 */
class AppError extends Error {
  constructor(message, status = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
  }
}

module.exports = AppError;
