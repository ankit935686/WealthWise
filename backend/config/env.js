const dotenv = require('dotenv');

dotenv.config();

const requiredVars = ['PORT', 'FRONTEND_URL', 'MONGODB_URI'];

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    // Keep startup strict so missing env is caught early.
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const configuredFrontendUrls = String(process.env.FRONTEND_URL || '')
  .split(',')
  .map((value) => value.trim().replace(/\/$/, ''))
  .filter(Boolean);

module.exports = {
  port: Number(process.env.PORT),
  frontendUrls: [...new Set(['http://localhost:5173', ...configuredFrontendUrls])],
  mongoUri: process.env.MONGODB_URI,
};
