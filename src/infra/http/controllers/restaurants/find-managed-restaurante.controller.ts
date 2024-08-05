import { FindRestaurantByIdUseCase } from '@application/restaurants/use-cases/find-restaurant-by-id/find-restaurant-by-id.use-case';
import { NotFoundError } from '@common/errors/app.error';
import { auth } from '@infra/auth/auth';
import { RestaurantsRepositoryFactory } from '@infra/database/factories/restaurants/restaurants-repository.factory';
import Elysia from 'elysia';

const restaurantsRepository = RestaurantsRepositoryFactory();

export const FindManagedRestaurantController = new Elysia().use(auth).get(
	'/restaurants/managed',
	async ({ findLoggedUser, set }) => {
		const { restaurant_id } = findLoggedUser();
		if (!restaurant_id) {
			throw new NotFoundError('ID do restaurante não encontrado');
		}

		const findRestaurantByIdUseCase = new FindRestaurantByIdUseCase(
			restaurantsRepository,
		);

		const restaurant = await findRestaurantByIdUseCase.execute({
			id: restaurant_id,
		});

		set.status = 200;

		return { restaurant };
	},
	{
		detail: {
			tags: ['Restaurants'],
		},
	},
);
