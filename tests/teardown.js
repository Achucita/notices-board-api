const db = require('../src/models');

module.exports = async () => {
  try {
    await db.sequelize.close();
    console.log('✅ Conexión de TEST cerrada');
  } catch (error) {
    console.error('❌ Error al cerrar conexión:', error);
  }
};
