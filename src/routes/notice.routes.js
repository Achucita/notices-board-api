const Router = require('@koa/router');
const noticeController = require('../controllers/notice.controller');

module.exports = (router) => {
  const noticeRouter = new Router({ prefix: '/api/notices' });

  noticeRouter.post('/', noticeController.create);
  noticeRouter.get('/', noticeController.findAll);
  noticeRouter.get('/:id', noticeController.findOne);
  noticeRouter.put('/:id', noticeController.update);
  noticeRouter.delete('/:id', noticeController.delete);

  router.use(noticeRouter.routes(), noticeRouter.allowedMethods());
};
