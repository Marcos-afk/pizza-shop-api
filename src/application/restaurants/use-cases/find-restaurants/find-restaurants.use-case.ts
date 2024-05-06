import type { FindRestaurantsDTO } from '@application/restaurants/dtos/find-restaurants.dto';
import type { RestaurantsRepository } from '@application/restaurants/repositories/restaurants.repository';

export class FindRestaurantsUseCase {
	constructor(private readonly restaurantsRepository: RestaurantsRepository) {}

	async execute(query: FindRestaurantsDTO) {
		return await this.restaurantsRepository.find(query);
	}
}
