// src/app.js
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

// Exporta la app SIN iniciar el servidor
module.exports = app;

// Solo inicia el servidor si no estamos en entorno de test
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
