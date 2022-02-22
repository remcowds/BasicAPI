const Router = require('@koa/router');
const installCategoryRouter = require('./categoryRouter');

const installUserRouter = require('./userRouter');


module.exports = function installRest(app) {
	const router = new Router({
		prefix: '/api',
	});

	installCategoryRouter(router);
	// installUserRouter(router);

	app.use(router.routes()).use(router.allowedMethods());
}