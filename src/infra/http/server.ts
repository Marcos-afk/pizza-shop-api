import { logsAdapter } from '@common/adapters/api-logs/logs.adapter';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { env } from 'src/env';
import { RestaurantsController } from './controllers/restaurants';
import cors from '@elysiajs/cors';

const app = new Elysia()
	.use(cors())
	.use(
		swagger({
			path: '/api-docs',
			documentation: {
				info: {
					title: 'API Documentation - Pizza shop',
					description: 'This is the API documentation for the pizza shop API',
					version: '1.0.0',
					contact: {
						name: 'Marcos André',
						email: 'andremarcos967@gmail.com',
						url: 'https://github.com/Marcos-afk',
					},
				},
				tags: [
					{
						name: 'Restaurants',
						description: 'Endpoints related to restaurants',
					},
				],
			},
		}),
	)
	.use(RestaurantsController);

app.listen(env.API_PORT as string, (callback) => {
	logsAdapter.success('Server', `Server is running on ${callback.url}`);
});
