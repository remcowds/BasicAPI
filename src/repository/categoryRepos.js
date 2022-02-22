const ServiceError = require('../core/serviceError');
const {
	getKnex,
	tables
} = require('../data/indexData');

const tableCategory = tables.category;

const getAllCategories = async () => {
	return await getKnex()(tableCategory).select();
};

const getCategoryByID = async (id) => {
	try {
		const category = await getKnex()(tableCategory)
			.select()
			.where({
				categoryID: id
			})
			.first();

		if (category) {
			return category;
		} else {
			throw ServiceError.notFound('No category found with id ' + id);
		}
	} catch (error) {
		console.log('Error getting category: ' + error);
		throw error;
	}
};

const updateCategory = async (id, category) => {
	const {
		categoryName,
		description,
		linkCat
	} = category;

	try {
		const ret = await getKnex()(tableCategory)
			.where({
				categoryID: id
			})
			.update({
				categoryName,
				description,
				linkCat,
			});
		if (ret === 0)
			throw ServiceError.notFound('No category found with id ' + id);
	} catch (error) {
		console.log('Error updating category: ' + error);
		throw error;
	}

	return await getCategoryByID(id);
};

const createCategory = async (category) => {
	const {
		categoryName,
		description,
		linkCat
	} = category;

	try {
		const ret = await getKnex()(tableCategory).insert({
			categoryName,
			description,
			linkCat,
		});
		if (ret) {
			return category;
		}
	} catch (error) {
		console.log('Error creating category', {
			error
		});
		throw error;
	}
};

const removeCategory = async (id) => {
	try {
		const ret = await getKnex()(tableCategory)
			.where({
				categoryID: id
			})
			.del();

		if (ret === 0) {
			throw ServiceError.notFound(`Category with id ${id} not found`);
		}
	} catch (error) {
		console.log('Error deleting category', {
			error
		});
		throw error;
	}
};

module.exports = {
	getAllCategories,
	getCategoryByID,
	updateCategory,
	createCategory,
	removeCategory

}