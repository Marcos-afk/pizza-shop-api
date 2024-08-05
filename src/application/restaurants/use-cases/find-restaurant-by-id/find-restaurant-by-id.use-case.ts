import type { RestaurantIdDTO } from '@application/restaurants/dtos/restaurant-id.dto';
import type { RestaurantsRepository } from '@application/restaurants/repositories/restaurants.repository';
import { NotFoundError } from '@common/errors/app.error';

export class FindRestaurantByIdUseCase {
	constructor(private readonly restaurantsRepository: RestaurantsRepository) {}

	async execute({ id }: RestaurantIdDTO) {
		const restaurant = await this.restaurantsRepository.findById(id);
		if (!restaurant) {
			throw new NotFoundError('Restaurante não encontrado');
		}

		return restaurant;
	}
}
