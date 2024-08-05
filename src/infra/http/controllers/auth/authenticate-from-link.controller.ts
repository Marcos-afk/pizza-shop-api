import { AuthenticateFromLinkUseCase } from '@application/auth-links/use-cases/authenticate-from-link/authenticate-from-link.use-case';
import { AuthLinksRepositoryFactory } from '@infra/database/factories/auth-links/auth-links-repository.factory';
import { RestaurantsRepositoryFactory } from '@infra/database/factories/restaurants/restaurants-repository.factory';
import { DateProviderFactory } from '@infra/providers/factories/date/date-provider.factory';
import Elysia, { t } from 'elysia';

const authLinksRepository = AuthLinksRepositoryFactory();
const dateProvider = DateProviderFactory();
const restaurantsRepository = RestaurantsRepositoryFactory();

export const AuthenticateFromLinkController = new Elysia().get(
	'/auth-links/authenticate',
	async ({ query, cookie: { auth } }) => {
		const { code } = query;

		const authenticateFromLinkUseCase = new AuthenticateFromLinkUseCase(
			authLinksRepository,
			dateProvider,
			restaurantsRepository,
		);

		const { token } = await authenticateFromLinkUseCase.execute({ code });

		auth.value = token;
		auth.httpOnly = true;
		auth.maxAge = 60 * 60 * 24 * 7; // 7 days
		auth.path = '/';
	},
	{
		query: t.Object({
			code: t.String({
				minLength: 1,
				error: 'Código é obrigatório',
				examples: ['mfunavf5no0mrnmh55cheza6'],
			}),
		}),
		detail: {
			tags: ['Auth'],
		},
	},
);
