const db = require('../src/models');

module.exports = async () => {
  try {
    // Espera a que MySQL esté listo
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    await db.sequelize.authenticate();
    await db.sequelize.sync({ force: true });
    console.log('✅ Base de datos de TEST lista');
  } catch (error) {
    console.error('❌ Error al preparar la BD de test:', error);
    throw error;
  }
};
