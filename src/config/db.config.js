require('dotenv').config();

const isDocker = process.env.RUNNING_IN_DOCKER === 'true';

module.exports = {
  HOST: isDocker ? 'mysql_db' : '127.0.0.1', // Nombre del contenedor
  USER: 'root',
  PASSWORD: 'password',
  DB: 'test_db',
  dialect: 'mysql',
  port: 3306,
  retry: {
    max: 15,
    timeout: 30000
  }
};
