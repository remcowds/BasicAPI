const Router = require('@koa/router');
const requireAuthentication = require('../core/auth');
const categoryService = require('../service/categoryService')
const Joi = require('joi')
const validate = require('./validation');


const getAll = async (ctx) => {
	ctx.body = 'getAllX';
	// ctx.body = await categoryService.getAllCategories();
};

const getByID = async (ctx) => {
	ctx.body = `get by ID: ${ctx.params.id}`;
	// ctx.body = await categoryService.getCategoryByID(ctx.params.id);
};

getByID.validationScheme = {
	params: Joi.object({
		id: Joi.number().invalid(0).positive(),
	}),
};

const updateByID = async (ctx) => {
	ctx.body = `update with id: ${ctx.params.id}`;
	// ctx.body = await categoryService.updateCategory(
	// 	ctx.params.id,
	// 	ctx.request.body
	// );
};

updateByID.validationScheme = {
	params: Joi.object({
		id: Joi.number().invalid(0).positive(),
	}),
	body: Joi.object({
		categoryName: Joi.string().alphanum().min(2).required(),
		description: Joi.string().allow(null), //mag null zijn maar niet undefined
		linkCat: Joi.string()
			.pattern(
				/[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
			)
			.required(),
	}),
};

const createSmth = async (ctx) => {
	ctx.body = 'create something';
	// ctx.body = await categoryService.createCategory(ctx.request.body);
	// ctx.status = 201;
};

createSmth.validationScheme = {
	body: Joi.object({
		categoryName: Joi.string().alphanum().min(2).required(),
		description: Joi.string().allow(null), //mag ook null zijn maar niet undefined
		linkCat: Joi.string()
			.pattern(
				/[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
			)
			.required(),
	}),
};

const deleteByID = async (ctx) => {
	ctx.body = `delete with id: ${ctx.params.id}`
	// await categoryService.removeCategory(ctx.params.id);
	// ctx.status = 204;
};

module.exports = function installCategoryRouter(superRouter) {
	const router = new Router({
		prefix: '/test',
	});

	//get all
	router.get('/', getAll);

	//get with id
	router.get(
		'/:id',
		// validate(getByID.validationScheme),
		getByID
	);

	//put request
	router.put(
		'/:id',
		// requireAuthentication,
		// validate(updateByID.validationScheme),
		updateByID
	);

	//post request
	router.post(
		'/',
		// requireAuthentication,
		// validate(createCategory.validationScheme),
		createSmth
	);

	//delete request
	router.delete(
		'/:id',
		// requireAuthentication,
		// validate(getCategoryByID.validationScheme), //gwn check op ID
		deleteByID
	);

	superRouter.use(router.routes()).use(router.allowedMethods());
}