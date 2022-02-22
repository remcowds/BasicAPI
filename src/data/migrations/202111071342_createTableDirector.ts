import type { Knex } from 'knex';
import { tables } from '../indexData';

export = {
	up: async (knex: Knex) => {
		await knex.schema.createTable(tables.director, (table) => {
			table.increments('directorID').primary();
			table.string('directorLastName', 45).notNullable();
			table.string('directorFirstName', 45).notNullable();
			table.string('birthdate').nullable();
			table.string('country', 45).nullable();
			table.string('linkDir', 2048).notNullable();
		});
	},
	down: (knex: Knex) => {
		return knex.schema.dropTableIfExists(tables.director);
	},
};
