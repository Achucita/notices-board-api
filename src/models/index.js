const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(
  dbConfig.DB || 'notices_db',
  dbConfig.USER || 'root',
  dbConfig.PASSWORD || 'password',
  {
    host: dbConfig.HOST || 'db',
    dialect: 'mysql',
    port: 3306
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.notices = require('./notice.model')(sequelize, Sequelize);

module.exports = db;
