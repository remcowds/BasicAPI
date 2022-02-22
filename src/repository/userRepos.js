const ServiceError = require('../core/serviceError');
const {
	getKnex,
	tables
} = require('../data/indexData');

const tableUser = tables.user;

const getUserByID = async (email) => {
	try {
		const user = await getKnex()(tableUser)
			.select()
			.where({
				userEmail: email
			})
			.first();

		if (user) {
			return user;
		} else {
			throw ServiceError.notFound('No user found with email ' + email);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const createUser = async (
	userEmail,
	userName,
	passwordHash
) => {
	try {
		await getKnex()(tableUser).insert({
			userEmail,
			userName,
			passwordHash,
		});
	} catch (error) {
		console.log('Error creating user: ' + error);
		throw new Error('failed to create: ' + error);
	}

	return await getUserByID(userEmail);
};

const getAllUsers = async () => {
	return await getKnex()(tableUser).select();
};

const updateUser = async (
	email,
	userName,
	passwordHash
) => {
	try {
		const ret = await getKnex()(tableUser)
			.where({
				userEmail: email
			})
			.update({
				userName,
				passwordHash,
			});
		if (ret === 0) {
			throw ServiceError.notFound('No user fount with email ' + email);
		}
	} catch (error) {
		console.log('Error updating user: ' + error);
		throw error;
	}
};

const removeUser = async (email) => {
	try {
		const ret = await getKnex()(tableUser)
			.where({
				userEmail: email
			})
			.del();
		if (ret === 0) {
			throw ServiceError.notFound(`User with email ${email} not found`);
		}
	} catch (error) {
		console.log('Error deleting user', {
			error
		});
		throw error;
	}
};

module.exports = {
	getUserByID,
	createUser,
	getAllUsers,
	updateUser,
	removeUser
}