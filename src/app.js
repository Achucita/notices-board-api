const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const db = require('./models');

const app = new Koa();
const router = new Router();

// Configuración de middlewares
app.use(bodyParser());
app.use(json());

// Rutas
require('./routes/notice.routes')(router);
app.use(router.routes()).use(router.allowedMethods());

// Función para iniciar el servidor
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Conexión a MySQL establecida');
    
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });

    // Mantener el proceso activo
    server.on('connection', (socket) => {
      socket.setTimeout(5000);
    });

  } catch (error) {
    console.error('❌ Error al iniciar:', error.message);
    process.exit(1);
  }
};

// Iniciar solo si no es test
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;
