import type { Knex } from 'knex';
import { tables } from '../indexData';

export = {
	up: async (knex: Knex) => {
		await knex.schema.createTable(tables.user, (table) => {
			table.string('userEmail', 80).primary();
			table.string('userName', 20).notNullable();
			table.string('passwordHash').notNullable();
		});
	},
	down: (knex: Knex) => {
		return knex.schema.dropTableIfExists(tables.user);
	},
};
