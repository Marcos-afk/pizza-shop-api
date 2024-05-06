import { InMemoryRestaurantsRepository } from '@application/restaurants/in-memory/in-memory-restaurants.repository';
import type { RestaurantsRepository } from '@application/restaurants/repositories/restaurants.repository';
import { db } from '@infra/database/drizzle/connection';
import { DrizzleRestaurantsRepository } from '@infra/database/drizzle/repositories/restaurants/drizzle-restaurants.repository';
import { env } from 'src/env';

let restaurantsRepositoryInstance: RestaurantsRepository = null;

export const UseRestaurantsRepository = () => {
	if (!restaurantsRepositoryInstance) {
		switch (env.NODE_ENV) {
			case 'development':
				restaurantsRepositoryInstance = new DrizzleRestaurantsRepository(db);
				break;

			case 'production':
				restaurantsRepositoryInstance = new DrizzleRestaurantsRepository(db);
				break;

			case 'test':
				restaurantsRepositoryInstance = new InMemoryRestaurantsRepository();
				break;

			default:
				restaurantsRepositoryInstance = new InMemoryRestaurantsRepository();
				break;
		}
	}

	return restaurantsRepositoryInstance;
};
