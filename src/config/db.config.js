require('dotenv').config();

module.exports = {
  HOST: process.env.NODE_ENV === 'test' ? 'localhost' : process.env.DB_HOST || 'db',
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_PASSWORD || 'password',
  DB: process.env.NODE_ENV === 'test' ? 'test_db' : process.env.DB_NAME || 'notices_db',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
