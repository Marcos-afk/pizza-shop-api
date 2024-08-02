import Elysia from 'elysia';
import { CreateRestaurantController } from './create-restaurant.controller';
import { FindManagedRestaurantController } from './find-managed-restaurante.controller';
import { FindRestaurantsByManagerController } from './find-restaurants-by-manager.controller';

export const RestaurantsController = new Elysia()
	.use(CreateRestaurantController)
	.use(FindRestaurantsByManagerController)
	.use(FindManagedRestaurantController);
