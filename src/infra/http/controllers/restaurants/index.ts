import Elysia from 'elysia';
import { CreateRestaurantController } from './create-restaurant.controller';
import { FindRestaurantsByManagerController } from './find-restaurants-by-manager.controller';

export const RestaurantsController = new Elysia()
	.use(CreateRestaurantController)
	.use(FindRestaurantsByManagerController);
