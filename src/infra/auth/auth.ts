import { UnauthorizedError } from '@common/errors/app.error';
import jwt from '@elysiajs/jwt';
import { UsersRepositoryFactory } from '@infra/database/factories/users/users-repository.factory';
import Elysia, { t } from 'elysia';
import { verify } from 'jsonwebtoken';
import { env } from 'src/env';

const usersRepository = UsersRepositoryFactory();

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

			findLoggedUser: async () => {
				if (!auth || !auth.value) {
					throw new UnauthorizedError('Acesso negado');
				}

				const payload = verify(auth.value, env.JWT_SECRET) as {
					sub: string;
					restaurant_id?: string;
				};

				if (!payload || !payload.sub) {
					throw new UnauthorizedError('Acesso negado');
				}

				const user = await usersRepository.findById(payload.sub);
				if (!user) {
					throw new UnauthorizedError('Acesso negado');
				}

				return {
					user_id: payload.sub,
					restaurant_id: payload.restaurant_id,
				};
			},
		};
	});
