const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const db=require('./models');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(json());

// Sincronizar la base de datos al iniciar
db.sequelize.sync({ force: true }) // force: true borrará y recreará las tablas
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });

// Rutas
require('./routes/notice.routes')(router);

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
