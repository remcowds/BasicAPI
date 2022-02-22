import type { Knex } from 'knex';
import { tables } from '../indexData';

export = {
	up: async (knex: Knex) => {
		await knex.schema.createTable(tables.movie, (table) => {
			table.increments('movieID').primary();
			table.integer('categoryID').notNullable().unsigned();
			table.integer('directorID').notNullable().unsigned();
			table.string('title', 45).notNullable();
			table.integer('yearOfRelease').nullable();
			table.double('rating').nullable();
			table.integer('durationInMinutes').nullable();
			table.string('linkMov', 2048).notNullable();
			//FK's
			table
				.foreign('categoryID', 'fk_movie_category')
				.references(`${tables.category}.categoryID`);
			table
				.foreign('directorID', 'fk_movie_director')
				.references(`${tables.director}.directorID`);
		});
	},
	down: (knex: Knex) => {
		return knex.schema.dropTableIfExists(tables.movie);
	},
};
