import { logsAdapter } from '@common/adapters/api-logs/logs.adapter';
import cookie from '@elysiajs/cookie';
import cors from '@elysiajs/cors';
import jwt from '@elysiajs/jwt';
import swagger from '@elysiajs/swagger';
import { Elysia, t } from 'elysia';
import { env } from 'src/env';
import { AuthController } from './controllers/auth';
import { RestaurantsController } from './controllers/restaurants';

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
					{
						name: 'Auth',
						description: 'Endpoints related to authentication',
					},
				],
			},
		}),
	)
	.use(
		jwt({
			name: 'jwt',
			secret: env.JWT_SECRET,
			schema: t.Object({
				sub: t.String(),
				restaurant_id: t.Optional(t.String()),
			}),
		}),
	)
	.use(cookie())
	.use(RestaurantsController)
	.use(AuthController);

app.listen(env.API_PORT as string, (callback) => {
	logsAdapter.success('Server', `Server is running on ${callback.url}`);
});
