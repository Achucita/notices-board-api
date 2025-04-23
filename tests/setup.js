const db = require('../src/models');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = async () => {
  console.log('🔍 Intentando conectar a MySQL...');
  
  let retries = 15;
  while (retries > 0) {
    try {
      await db.sequelize.authenticate();
      console.log('✅ ¡Conexión exitosa!');
      await db.sequelize.sync({ force: true });
      return;
    } catch (err) {
      retries--;
      console.log(`🔄 Intento fallido (${retries} restantes). Error: ${err.message}`);
      await delay(3000);
    }
  }
  throw new Error('No se pudo conectar después de 15 intentos');
};
