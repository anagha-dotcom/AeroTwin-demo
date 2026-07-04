/**
 * Central config loader.
 * Reads environment variables once and exposes typed, defaulted values
 * so the rest of the backend never touches `process.env` directly.
 */
require('dotenv').config();

const config = {
  port: Number(process.env.PORT) || 4000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  env: process.env.NODE_ENV || 'development',
};

module.exports = config;
