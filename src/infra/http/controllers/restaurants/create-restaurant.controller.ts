import Elysia, { t } from 'elysia';
import { UseRestaurantsRepository } from './options';
import type { CreateRestaurantDTO } from '@application/restaurants/dtos/create-restaurant.dto';
import { CreateRestaurantUseCase } from '@application/restaurants/use-cases/create-restaurant/create-restaurant.use-case';
import { AppError } from '@common/errors/app.error';

const useRestaurantsRepository = UseRestaurantsRepository();

export const CreateRestaurantController = new Elysia().post(
	'/restaurants',
	async ({ body, set }) => {
		const data = body as CreateRestaurantDTO;

		const createRestaurantUseCase = new CreateRestaurantUseCase(
			useRestaurantsRepository,
		);

		await createRestaurantUseCase.execute(data);

		set.status = 201;
	},
	{
		body: t.Object({
			name: t.String({
				minLength: 1,
				error: 'Nome do restaurante é obrigatório',
				examples: ['Pizza Hut'],
			}),
			description: t.String({
				minLength: 1,
				error: 'Descrição do restaurante é obrigatória',
				examples: [
					'Pizza Hut é uma rede de restaurantes de fast food especializada em pizzas.',
				],
			}),
			manager_email: t.String({
				minLength: 1,
				error: 'Email do gerente é obrigatório e deve ser válido',
				examples: ['julioalmeida@pizzahut.com'],
				format: 'email',
			}),
			manager_name: t.String({
				minLength: 1,
				error: 'Nome do gerente é obrigatório',
				examples: ['Julio Almeida'],
			}),
			manager_phone: t.String({
				minLength: 1,
				error: 'Telefone do gerente é obrigatório e deve ser válido',
				examples: ['(66) 9999-9999'],
				pattern: String.raw`^\(\d{2}\) \d{4,5}-\d{4}$`,
			}),
		}),
		detail: {
			tags: ['Restaurants'],
		},
		error({ error, set }) {
			if (error instanceof AppError) {
				set.status = error.statusCode;
				return {
					status: error.statusCode,
					message: error.message,
				};
			}

			return error;
		},
	},
);
