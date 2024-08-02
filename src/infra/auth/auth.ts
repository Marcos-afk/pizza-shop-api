import { AppError } from '@common/errors/app.error';
import jwt from '@elysiajs/jwt';
import Elysia, { t } from 'elysia';
import { verify } from 'jsonwebtoken';
import { env } from 'src/env';

export const auth = new Elysia()
	.use(
		jwt({
			secret: env.JWT_SECRET,
			schema: t.Object({
				sub: t.String(),
				restaurant_id: t.Optional(t.String()),
			}),
		}),
	)
	.derive({ as: 'scoped' }, ({ cookie: { auth } }) => {
		return {
			signOut: async () => {
				auth.remove();
			},

			findLoggedUser: () => {
				if (!auth || !auth.value) {
					throw new AppError('Acesso negado', 401);
				}

				const payload = verify(auth.value, env.JWT_SECRET) as {
					sub: string;
					restaurant_id?: string;
				};

				if (!payload) {
					throw new AppError('Acesso negado', 401);
				}

				return {
					user_id: payload.sub,
					restaurant_id: payload.restaurant_id,
				};
			},
		};
	});
