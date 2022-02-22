module.exports = {
	log: {
		level: 'silly',
		disabled: false,
	},
	auth: {
		jwt: {
			secret: 'secretvanremcodesmedt',
			expirationInterval: 60 * 60 * 100, //1u - milliseconden
			issuer: 'http://localhost:9000', //wie het maakt
			audience: 'http://localhost:3000', //wie het gebruikt --> server front end
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
		origins: ['http://localhost:3000'],
		maxAge: 3 * 60 * 60,
	},
	connectionDB: {
		name: 'moviesdev',
		client: 'mysql2',
		host: '127.0.0.1',
		port: '3306',
	},
};
