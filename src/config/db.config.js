require('dotenv').config();

const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  HOST: isTest ? 'mysql' : process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_PASSWORD || 'password',
  DB: isTest ? 'test_db' : process.env.DB_NAME || 'notices_db',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  retry: {
    max: 5,
    timeout: 30000
  }
};
