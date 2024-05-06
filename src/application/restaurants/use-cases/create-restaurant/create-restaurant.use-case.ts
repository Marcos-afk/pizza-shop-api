import type { CreateRestaurantDTO } from '@application/restaurants/dtos/create-restaurant.dto';
import type { RestaurantsRepository } from '@application/restaurants/repositories/restaurants.repository';
import { AppError } from '@common/errors/app.error';

export class CreateRestaurantUseCase {
	constructor(private readonly restaurantRepository: RestaurantsRepository) {}

	async execute({ name, description, ...data }: CreateRestaurantDTO) {
		const isExistRestaurant =
			await this.restaurantRepository.findRestaurantByName(name);

		if (isExistRestaurant) {
			throw new AppError('Já existe um restaurante com esse nome');
		}

		const restaurant = await this.restaurantRepository.create({
			name,
			description,
			...data,
		});

		return restaurant;
	}
}
