module.exports = {
	env: 'NODE_ENV',
	connectionDB: {
		host: 'DATABASE_HOST',
		user: 'DATABASE_USER',
		password: 'DATABASE_PASSWORD',
		name: 'DATABASE_NAME',
	},
	auth: {
		jwt: {
			secret: 'JWT_SECRET',
		},
	},
	gmail: {
		gmail_adres: 'gmail_adres',
		gmail_ww: 'gmail_ww',
	},
};