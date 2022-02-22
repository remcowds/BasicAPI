import type { Knex } from 'knex';
import { tables } from '../indexData';

export = {
	up: async (knex: Knex) => {
		await knex.schema.createTable(tables.category, (table) => {
			table.increments('categoryID').primary();
			table.string('categoryName', 45).notNullable();
			table.string('description', 100).nullable();
			table.string('linkCat', 2048).notNullable();
		});
	},
	down: (knex: Knex) => {
		return knex.schema.dropTableIfExists(tables.category);
	},
};
