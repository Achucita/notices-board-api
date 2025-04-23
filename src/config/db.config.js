module.exports = {
  HOST: process.env.DB_HOST || 'db', // ¡Usa 'db' en Docker!
  USER: 'root',
  PASSWORD: 'password',
  DB: 'notices_db',
  dialect: 'mysql',
  port: 3306,
  retry: {
    max: 5,
    timeout: 10000
  }
};
