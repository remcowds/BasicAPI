const config = require('config');
const userRepos = require('../repository/userRepos');
const {
	verifyPassword,
	hashPassword
} = require('../core/password')
const {
	generateJWT,
	verifyJWT
} = require('../core/jwt')
const ServiceError = require('../core/serviceError');
const nodemailer = require('nodemailer');

//returns the token and the user's public attributes
const makeLoginData = async (user) => {
	const token = await generateJWT(user);
	return {
		user: {
			userEmail: user.userEmail,
			userName: user.userName,
		},
		token,
	};
};

const checkAndParseSession = async (authHeader) => {
	if (!authHeader) {
		throw ServiceError.unauthorized('Not signed in');
	}

	if (!authHeader.startsWith('Bearer ')) {
		throw ServiceError.validationFailed('Invalid auth token');
	}

	const authToken = authHeader.substr(7);

	//JWT verifieren
	try {
		const payload = await verifyJWT(authToken);

		if (!payload.userID) {
			throw ServiceError.validationFailed('Invalid auth token');
		}

		const userID = payload.userID;

		return {
			userID,
			authToken
		};
	} catch (error) {
		throw ServiceError.validationFailed('Invalid auth token');
	}
};

const login = async (email, password) => {
	//zien of de user er is, indien niet wordt error geworpen in repos
	const user = await userRepos.getUserByID(email);

	const passwordValid = await verifyPassword(password, user.passwordHash);

	if (!passwordValid) {
		throw ServiceError.validationFailed('wrong email / password');
	}
	return await makeLoginData(user);
};

const sendEmail = (email, name) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: config.get('gmail.gmail_adres'),
			pass: config.get('gmail.gmail_ww'),
		},
	});

	transporter.sendMail({
			from: config.get('gmail.gmail_adres'),
			to: 'remcodesmedt31@hotmail.com',
			subject: 'Registration alert',
			text: `There has been a registration: \n\nUseremail: ${email} \n\nUsername: ${name}`,
		},
		(err, info) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Mail sent.');
			}
		}
	);
};

const register = async (
	email,
	name,
	password
) => {
	//ww hashen
	const passwordHash = await hashPassword(password);

	const user = await userRepos.createUser(email, name, passwordHash);

	//config variabelen leeg? -> geen mail sturen
	try {
		sendEmail(user.userEmail, user.userName);
	} catch (err) {
		console.log(err);
	}

	return await makeLoginData(user);
};

const getAllUsers = async () => {
	return await userRepos.getAllUsers();
};

const getUserByID = async (email) => {
	return await userRepos.getUserByID(email);
};

const updateUser = async (email, user) => {
	const passwordHash = await hashPassword(user.password);

	return await userRepos.updateUser(email, user.userName, passwordHash);
};

const removeUser = async (email) => {
	return await userRepos.removeUser(email);
};

module.exports = {
	checkAndParseSession,
	login,
	register,
	getAllUsers,
	getUserByID,
	updateUser,
	removeUser
}