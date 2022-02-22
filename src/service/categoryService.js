const categoryRepos = require('../repository/categoryRepos');

const getAllCategories = async () => {
	return await categoryRepos.getAllCategories();
};

const getCategoryByID = async (id) => {
	return await categoryRepos.getCategoryByID(id);
};

const updateCategory = async (id, category) => {
	return await categoryRepos.updateCategory(id, category);
};

const createCategory = async (category) => {
	return await categoryRepos.createCategory(category);
};

const removeCategory = async (id) => {
	await categoryRepos.removeCategory(id);
};

module.exports = {
	getAllCategories,
	getCategoryByID,
	updateCategory,
	createCategory,
	removeCategory,
	wrongshitman
}