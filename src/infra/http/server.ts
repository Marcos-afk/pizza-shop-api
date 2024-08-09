import { logsAdapter } from '@common/adapters/api-logs/logs.adapter';
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} from '@common/errors/app.error';
import cors from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { env } from 'src/env';
import { AuthController } from './controllers/auth';
import { RestaurantsController } from './controllers/restaurants';
import { UsersController } from './controllers/users';

const app = new Elysia()
	.error({
		UNAUTHORIZED: UnauthorizedError,
		BAD_REQUEST: BadRequestError,
		NOT_FOUND: NotFoundError,
	})
	.onError(({ code, error, set }) => {
		switch (code) {
			case 'UNAUTHORIZED': {
				set.status = 401;
				return { code, message: error.message };
			}
			case 'VALIDATION': {
				set.status = error.status;

				return error.toResponse();
			}
			case 'NOT_FOUND': {
				set.status = 404;
				return { code, message: error.message };
			}
			case 'BAD_REQUEST': {
				set.status = 400;
				return { code, message: error.message };
			}
			default: {
				return {
					code: 'INTERNAL_SERVER_ERROR',
					message: error.message,
				};
			}
		}
	})
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
					{
						name: 'Users',
						description: 'Endpoints related to users',
					},
				],
			},
		}),
	)
	.use(RestaurantsController)
	.use(AuthController)
	.use(UsersController);

app.listen(env.API_PORT as string, (callback) => {
	logsAdapter.success('Server', `Server is running on ${callback.url}`);
});
