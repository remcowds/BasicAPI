const config = require('config');
const jwt = require('jsonwebtoken');
const ServiceError = require('./serviceError');

const JWT_AUDIENCE = config.get('auth.jwt.audience');
const JWT_ISSUER = config.get('auth.jwt.issuer');
const JWT_SECRET = config.get('auth.jwt.secret');
const JWT_EXPIRATION_INTERVAL = config.get(
	'auth.jwt.expirationInterval'
);

const generateJWT = (user) => {
	const tokenData = {
		userID: user.userEmail,
	};

	const signOptions = {
		expiresIn: Math.floor(JWT_EXPIRATION_INTERVAL / 100), //seconden
		audience: JWT_AUDIENCE,
		issuer: JWT_ISSUER,
		subject: 'auth',
	};

	return new Promise((resolve, reject) => {
		const callback = (err, token) => {
			if (err) {
				console.log('Error signing new token: ' + err.message);
				return reject(err);
			}
			return resolve(token);
		};

		jwt.sign(tokenData, JWT_SECRET, signOptions, callback);
	});
};

const verifyJWT = (authToken) => {
	const verifyOptions = {
		audience: JWT_AUDIENCE,
		issuer: JWT_ISSUER,
		subject: 'auth',
	};

	return new Promise < jwt.JwtPayload > ((resolve, reject) => {
		jwt.verify(
			authToken,
			JWT_SECRET,
			verifyOptions,
			(err, decodedToken) => {
				if (err || !decodedToken) {
					console.log(
						'Error while verifying token: ',
						err.message
					);
					return reject(
						err ||
						ServiceError.unauthorized(
							'Token could not be parsed'
						)
					);
				}
				return resolve(decodedToken);
			}
		);
	});
};

module.exports = {
	generateJWT,
	verifyJWT
}