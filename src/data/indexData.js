const config = require('config');
const Knex = require('knex');
const join = require('path');

let knex;

const isDevelopment = config.get('env') === 'development';

async function initializeData() {
	const knexOptions = {
		client: config.get('connectionDB.client'),
		connection: {
			host: config.get('connectionDB.host'),
			port: config.get('connectionDB.port'),
			user: config.get('connectionDB.user'),
			password: config.get('connectionDB.password'),
			database: null,
		},
		// print all executed queries
		// debug: true,
		migrations: {
			tableName: 'knex_metadata',
			directory: join('src', 'data', 'migrations'),
		},
		seeds: {
			directory: join('src', 'data', 'seeds'),
		},
	};

	console.log('yeet')

	//instantie maken van Knex
	knex = Knex.knex(knexOptions);

	// connectie testen + database creeren indien die nog niet bestaat
	try {
		await knex.raw('select 1');

		await knex.raw(
			`create database if not exists ${config.get('connectionDB.name')}`
		);
		// use created database
		await knex.destroy();
		knexOptions.connection.database = config.get('connectionDB.name');
		knex = Knex.knex(knexOptions);
		//connectie opnieuw testen
		await knex.raw('select 1');
	} catch (error) {
		throw new Error('Connection failed:' + error);
	}

	//migrations
	let migrationsFailed = true;
	try {
		await knex.migrate.latest();
		migrationsFailed = false;
	} catch (error) {
		console.log('Error migrating: ' + error);
	}

	//migrations failed -> undo de laatste
	if (migrationsFailed) {
		try {
			await knex.migrate.down();
		} catch (error) {
			console.log('Error migrating down: ' + error);
		}

		throw new Error('Migrations failed');
	}

	//seeds enkel development!
	if (isDevelopment) {
		//alle seeds runnen
		try {
			await knex.seed.run();
		} catch (error) {
			console.log('Error seeding: ' + error);
		}
	}

	return knex;
}

//getter voor knex
function getKnex() {
	if (knex === null) {
		throw new Error('No instance of knex');
	}
	return knex;
}

//tabelnamen in een onwijzigbaar object
const tables = Object.freeze({
	movie: 'movie',
	category: 'category',
	director: 'director',
	user: 'user',
});

async function shutdownData() {
	await knex.destroy();
}

module.exports = {
	tables,
	getKnex,
	initializeData,
	shutdownData
}