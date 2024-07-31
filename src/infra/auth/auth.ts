import jwt from '@elysiajs/jwt';
import Elysia, { t } from 'elysia';
import { env } from 'src/env';

export const auth = new Elysia().use(
	jwt({
		secret: env.JWT_SECRET,
		schema: t.Object({
			sub: t.String(),
			restaurant_id: t.Optional(t.String()),
		}),
	}),
);
