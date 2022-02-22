import type { Knex } from 'knex';
import { tables } from '../indexData';

export = {
	up: async (knex: Knex) => {
		//eerst leegmaken
		await knex(tables.user).del();
		//dan users toevoegen
		//wachtwoorden zijn zelfde als username
		await knex(tables.user).insert([
			{
				userEmail: 'remco.desmedt@student.hogent.be',
				userName: 'remcodsmdt',
				passwordHash:
					'$argon2id$v=19$m=131072,t=6,p=1$ShJAKE17/TtwPkcyTKFv0A$fWE9b8JBojLrYUlWRM1N8XRS7RZXIem18HO7k9HHKqE',
			},
			{
				userEmail: 'thomas.aelbrecht@hogent.be',
				userName: 'thomasaelbrecht',
				passwordHash:
					'$argon2id$v=19$m=131072,t=6,p=1$p4U1kzfNBTM9EW7XyAp/sw$/o4HcxFLJKjyrSVWq2Gek2ZynqPJUoRsqgn8uniELAc',
			},
		]);
	},
	down: async (knex: Knex) => {
		// leegmaken
		await knex(tables.movie).del();
	},
};
