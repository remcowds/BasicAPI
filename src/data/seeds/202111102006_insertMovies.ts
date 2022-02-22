import type { Knex } from 'knex';
import { tables } from '../indexData';

export = {
	seed: async (knex: Knex) => {
		//eerst leegmaken
		await knex(tables.movie).del();
		// en de auto_increment herstellen
		await knex.raw(`alter table ${tables.movie} AUTO_INCREMENT = 1`);

		//alle movies toevoegen
		await knex(tables.movie).insert([
			{
				categoryID: 3,
				directorID: 1,
				title: 'The Shawshank Redemption',
				yearOfRelease: 1994,
				rating: 9.3,
				durationInMinutes: 142,
				linkMov:
					'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg',
			},
			{
				categoryID: 3,
				directorID: 2,
				title: 'The Godfather',
				yearOfRelease: 1972,
				rating: 9.2,
				durationInMinutes: 175,
				linkMov: 'https://media.s-bol.com/xkqpRqQ88mLl/550x788.jpg',
			},
			{
				categoryID: 1,
				directorID: 3,
				title: 'The Dark Knight',
				yearOfRelease: 2008,
				rating: 9,
				durationInMinutes: 152,
				linkMov:
					'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/826e20d747af639e2e2c3a95662283eabc6a6216a9bb74fc45cb1c29f2708b96._RI_V_TTW_.jpg',
			},
			{
				categoryID: 2,
				directorID: 4,
				title: 'Forrest Gump',
				yearOfRelease: 1994,
				rating: 8.8,
				durationInMinutes: 142,
				linkMov:
					'https://occ-0-1722-1723.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABVyJhGPDVon6krEtJyk-IT3lb8ixBh984BtohkPQ1aLVSZ4p9PhkAqX-UFzuzvcW-S82q97oix0kuQwQ34oBwhhWjWtL.jpg?r=9f4',
			},
		]);
	},
};
