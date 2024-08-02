import type { CreateRestaurantDTO } from '@application/restaurants/dtos/create-restaurant.dto';
import type { FindRestaurantsDTO } from '@application/restaurants/dtos/find-restaurants.dto';
import { RestaurantEntity } from '@application/restaurants/entities/restaurant.entity';
import type { RestaurantsRepository } from '@application/restaurants/repositories/restaurants.repository';
import { eq, ilike } from 'drizzle-orm';
import type { db } from '../../connection';
import { RestaurantsSchema, UsersSchema } from '../../schemas';

export class DrizzleRestaurantsRepository implements RestaurantsRepository {
	constructor(private readonly database: typeof db) {}

	async find({
		name,
		manager_id,
	}: FindRestaurantsDTO): Promise<RestaurantEntity[]> {
		const query = this.database.select().from(RestaurantsSchema);

		if (name) {
			query.where(ilike(RestaurantsSchema.name, `%${name}%`));
		}

		if (manager_id) {
			query.where(eq(RestaurantsSchema.manager_id, manager_id));
		}

		const restaurants = await query;

		return restaurants.map((restaurant) => new RestaurantEntity(restaurant));
	}

	async findRestaurantByName(name: string): Promise<RestaurantEntity | null> {
		const restaurants = await this.database
			.select()
			.from(RestaurantsSchema)
			.where(eq(RestaurantsSchema.name, name));

		return restaurants.length && restaurants.length > 0
			? new RestaurantEntity(restaurants[0])
			: null;
	}

	async findById(id: string): Promise<RestaurantEntity | null> {
		const restaurants = await this.database
			.select()
			.from(RestaurantsSchema)
			.where(eq(RestaurantsSchema.id, id));

		return restaurants.length && restaurants.length > 0
			? new RestaurantEntity(restaurants[0])
			: null;
	}

	async findRestaurantByManagerId(
		manager_id: string,
	): Promise<RestaurantEntity | null> {
		const restaurants = await this.database
			.select()
			.from(RestaurantsSchema)
			.where(eq(RestaurantsSchema.manager_id, manager_id));

		return restaurants.length && restaurants.length > 0
			? new RestaurantEntity(restaurants[0])
			: null;
	}

	async create({
		name,
		description,
		manager_email,
		manager_name,
		manager_phone,
	}: CreateRestaurantDTO): Promise<RestaurantEntity> {
		const data = await this.database.transaction(async (trx) => {
			const user = await trx
				.insert(UsersSchema)
				.values({
					name: manager_name,
					email: manager_email,
					phone: manager_phone,
					role: 'manager',
				})
				.returning({ user_id: UsersSchema.id });

			return await trx
				.insert(RestaurantsSchema)
				.values({
					name,
					description,
					manager_id: user[0].user_id,
				})
				.returning();
		});

		return new RestaurantEntity(data[0]);
	}
}
