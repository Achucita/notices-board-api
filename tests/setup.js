const db = require('../src/models');

module.exports = async () => {
  // Configuración específica para testing
  process.env.NODE_ENV = 'test';
  
  try {
    await db.sequelize.sync({ force: true });
    console.log('✅ Base de datos de TEST sincronizada');
  } catch (error) {
    console.error('❌ Error al sincronizar BD de test:', error);
    throw error;
  }
};
