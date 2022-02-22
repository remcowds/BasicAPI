const config = require('config');
const argon2 = require('argon2');


const ARGON_SALT_LENGTH = config.get('auth.argon.saltLength');
const ARGON_HASH_LENGTH = config.get('auth.argon.hashLength');
const ARGON_TIME_COST = config.get('auth.argon.timeCost');
const ARGON_MEMORY_COST = config.get('auth.argon.memoryCost');

const argonOptions = {
	type: argon2.argon2id,
	saltLength: ARGON_SALT_LENGTH,
	hashLength: ARGON_HASH_LENGTH,
	timeCost: ARGON_TIME_COST,
	memoryCost: ARGON_MEMORY_COST,
};

const hashPassword = async (password) => {
	//returns hashed password
	return await argon2.hash(password, argonOptions);
};

const verifyPassword = async (
	password,
	passwordHash
) => {
	//returns valid / not
	return await argon2.verify(passwordHash, password, argonOptions);
};

module.exports = {
	hashPassword,
	verifyPassword
}