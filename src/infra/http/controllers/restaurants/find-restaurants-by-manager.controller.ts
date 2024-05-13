import Elysia, { t } from 'elysia';
import type { FindRestaurantsDTO } from '@application/restaurants/dtos/find-restaurants.dto';
import { FindRestaurantsUseCase } from '@application/restaurants/use-cases/find-restaurants/find-restaurants.use-case';
import { RestaurantsRepositoryFactory } from '@infra/database/factories/restaurants/restaurants-repository.factory';

const restaurantsRepository = RestaurantsRepositoryFactory();

export const FindRestaurantsByManagerController = new Elysia().get(
	'/restaurants',
	async ({ query, set }) => {
		const { manager_id, name } = query as FindRestaurantsDTO;

		const findRestaurantsUseCase = new FindRestaurantsUseCase(
			restaurantsRepository,
		);

		const restaurants = await findRestaurantsUseCase.execute({
			manager_id,
			name,
		});

		set.status = 200;

		return restaurants;
	},
	{
		query: t.Object({
			manager_id: t.Optional(
				t.String({
					description: 'ID do gerente',
				}),
			),
			name: t.Optional(
				t.String({
					description: 'Nome do restaurante',
				}),
			),
		}),
		detail: {
			tags: ['Restaurants'],
		},
	},
);
