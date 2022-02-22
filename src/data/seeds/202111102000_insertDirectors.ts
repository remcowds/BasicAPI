import type { Knex } from 'knex';
import { tables } from '../indexData';

export = {
	seed: async (knex: Knex) => {
		//om leeg te maken eerst de FK check uitzetten
		await knex.raw(`set foreign_key_checks = 0`);

		// leegmaken
		await knex(tables.director).del();

		// FK check weer aanzetten
		await knex.raw(`set foreign_key_checks = 1`);

		// en de auto_increment herstellen
		await knex.raw(`alter table ${tables.director} AUTO_INCREMENT = 1`);

		//alle directors toevoegen
		await knex(tables.director).insert([
			{
				directorLastName: 'Darabont',
				directorFirstName: 'Frank',
				birthdate: '1959-01-28',
				country: 'France',
				linkDir:
					'https://m.media-amazon.com/images/M/MV5BNjk0MTkxNzQwOF5BMl5BanBnXkFtZTcwODM5OTMwNA@@._V1_UY264_CR17,0,178,264_AL_.jpg',
			},
			{
				directorLastName: 'Ford Coppola',
				directorFirstName: 'Francis',
				birthdate: '1939-04-07',
				country: 'USA',
				linkDir:
					'https://upload.wikimedia.org/wikipedia/commons/4/41/Francis_Ford_Coppola.jpg',
			},
			{
				directorLastName: 'Nolan',
				directorFirstName: 'Christopher',
				birthdate: '1970-07-30',
				country: 'UK',
				linkDir:
					'https://upload.wikimedia.org/wikipedia/commons/c/c4/Christopher_Nolan%2C_London%2C_2013_%28crop%29.jpg',
			},
			{
				directorLastName: 'Zemeckis',
				directorFirstName: 'Robert',
				birthdate: '1951-05-14',
				country: 'USA',
				linkDir:
					'https://upload.wikimedia.org/wikipedia/commons/d/d7/Robert_Zemeckis_%22The_Walk%22_at_Opening_Ceremony_of_the_28th_Tokyo_International_Film_Festival_%2821835891403%29_%28cropped%29.jpg',
			},
		]);
	},
};
