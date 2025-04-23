const db = require('../src/models');

module.exports = async () => {
  console.log('🔍 Conectando a MySQL...');
  
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ force: true });
    console.log('✅ ¡Conexión exitosa!');
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    throw error;
  }
};
