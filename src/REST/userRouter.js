const Router = require('@koa/router');
const {
	requireAuthentication,
} = require('../core/auth');
const userService = require('../service/userService')


const login = async (ctx) => {
	const {
		userEmail,
		password
	} = ctx.request.body;
	ctx.body = await userService.login(userEmail, password);
};

const register = async (ctx) => {
	const {
		userEmail,
		userName,
		password
	} = ctx.request.body;
	ctx.body = await userService.register(userEmail, userName, password);
};

const getAllUsers = async (ctx) => {
	ctx.body = await userService.getAllUsers();
};

const getUserByID = async (ctx) => {
	ctx.body = await userService.getUserByID(ctx.params.id);
};

const updateUser = async (ctx) => {
	ctx.body = await userService.updateUser(ctx.params.id, ctx.request.body);
};

const removeUser = async (ctx) => {
	await userService.removeUser(ctx.params.id);
	ctx.status = 204;
};

module.exports = function installUserRouter(superRouter) {
	const router = new Router({
		prefix: '/users',
	});

	// router.post('/login', login);
	// router.post('/register', register);

	// //users: gevoelige informatie --> sws met auth
	// router.get('/', requireAuthentication, getAllUsers);
	// router.get('/:id', requireAuthentication, getUserByID);
	// router.put('/:id', requireAuthentication, updateUser);
	// router.delete('/:id', requireAuthentication, removeUser);

	superRouter.use(router.routes()).use(router.allowedMethods());
}