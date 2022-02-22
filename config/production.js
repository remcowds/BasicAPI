module.exports = {
	log: {
		level: 'info',
		disabled: false,
	},
	auth: {
		jwt: {
			secret: process.env.JWT_SECRET,
			expirationInterval: 12 * 60 * 60 * 100, //12uur - milliseconden
			issuer: 'https://remcodesmedt-api-movies.herokuapp.com/', //wie het maakt
			audience:
				'https://remcodesmedt.github.io/frontendweb-thomas-2122-remcodesmedt/', //wie het gebruikt --> server front end
		},
		argon: {
			saltLength: 16,
			hashLength: 32,
			timeCost: 6,
			memoryCost: 2 ** 17,
		},
	},
	cors: {
		//URL webapp front-end
		origins: ['http://localhost:3000', 'https://remcodesmedt.github.io'],
		maxAge: 3 * 60 * 60,
	},
	connectionDB: {
		name: 'moviesprod',
		client: 'mysql2',
		host: '127.0.0.1',
		port: '3306',
	},
};
