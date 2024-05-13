import type { CreateRestaurantDTO } from '../dtos/create-restaurant.dto';
import type { FindRestaurantsDTO } from '../dtos/find-restaurants.dto';
import { RestaurantEntity } from '../entities/restaurant.entity';
import type { RestaurantsRepository } from '../repositories/restaurants.repository';

export class InMemoryRestaurantsRepository implements RestaurantsRepository {
	private readonly restaurants: RestaurantEntity[] = [];

	async find({
		name,
		manager_id,
	}: FindRestaurantsDTO): Promise<RestaurantEntity[]> {
		const restaurants = this.restaurants.filter((restaurant) => {
			if (name && !restaurant.name.includes(name)) return false;
			if (manager_id && restaurant.manager_id !== manager_id) return false;

			return true;
		});

		return restaurants.map((restaurant) => new RestaurantEntity(restaurant));
	}

	async findRestaurantByName(name: string): Promise<RestaurantEntity | null> {
		const restaurant = this.restaurants.find(
			(restaurant) => restaurant.name === name,
		);

		return restaurant ? new RestaurantEntity(restaurant) : null;
	}

	async create({
		name,
		description,
	}: CreateRestaurantDTO): Promise<RestaurantEntity> {
		const restaurant = new RestaurantEntity({
			id: String(this.restaurants.length + 1),
			name,
			description,
			manager_id: '1',
			created_at: new Date(),
			updated_at: new Date(),
		});

		this.restaurants.push(restaurant);

		return restaurant;
	}
}
