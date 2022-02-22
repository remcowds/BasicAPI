import type { Knex } from 'knex';
import { tables } from '../indexData';
import config from 'config';

export = {
	up: async (knex: Knex) => {
		//om leeg te maken eerst de FK check uitzetten
		await knex.raw(`set foreign_key_checks = 0`);

		// leegmaken
		await knex(tables.category).del();

		// FK check weer aanzetten
		await knex.raw(`set foreign_key_checks = 1`);

		// en de auto_increment herstellen
		await knex.raw(`alter table ${tables.category} AUTO_INCREMENT = 1`);

		//alle categorieen toevoegen
		await knex(tables.category).insert([
			{
				categoryName: 'Action',
				description: 'war, martial arts, guns',
				linkCat:
					'https://images.unsplash.com/photo-1598389759169-4e0c192c6816?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80',
			},
			{
				categoryName: 'Romance',
				description: 'love, romantic, sex',
				linkCat:
					'https://images.unsplash.com/photo-1494403687614-8ca3e13f154f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
			},
			{
				categoryName: 'Drama',
				linkCat:
					'https://images.unsplash.com/photo-1572851899646-a1f69c664e1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			},
			{
				categoryName: 'Comedy',
				description: 'funny',
				linkCat:
					'https://images.unsplash.com/photo-1615592602923-9fb437226763?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80',
			},
			{
				categoryName: 'Horror',
				description: 'scary, pain, panic',
				linkCat:
					'https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1137&q=80',
			},
			{
				categoryName: 'Musical',
				description: 'music, singing, joy',
				linkCat:
					'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
			},
		]);
	},
	down: async (knex: Knex) => {
		// leegmaken
		await knex(tables.category).del();
		// en de auto_increment herstellen
		await knex.raw(`alter table ${tables.category} AUTO_INCREMENT = 1`);
	},
};
