import type { CreateRestaurantDTO } from '../dtos/create-restaurant.dto';
import type { FindRestaurantsDTO } from '../dtos/find-restaurants.dto';
import type { RestaurantEntity } from '../entities/restaurant.entity';

export interface RestaurantsRepository {
	find(query: FindRestaurantsDTO): Promise<RestaurantEntity[]>;
	findRestaurantByName(name: string): Promise<RestaurantEntity | null>;
	findById(id: string): Promise<RestaurantEntity | null>;
	findRestaurantByManagerId(
		manager_id: string,
	): Promise<RestaurantEntity | null>;
	create(data: CreateRestaurantDTO): Promise<RestaurantEntity>;
}
