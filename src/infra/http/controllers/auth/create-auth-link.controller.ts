import { CreateAuthLinkUseCase } from '@application/auth-links/use-cases/create-auth-link/create-auth-link.use-case';
import { AuthLinksRepositoryFactory } from '@infra/database/factories/auth-links/auth-links-repository.factory';
import { UsersRepositoryFactory } from '@infra/database/factories/users/users-repository.factory';
import { MailProviderFactory } from '@infra/providers/factories/mail/mail-provider.factory';
import Elysia, { t } from 'elysia';

const authLinksRepository = AuthLinksRepositoryFactory();
const usersRepository = UsersRepositoryFactory();
const mailProvider = MailProviderFactory();

export const CreateAuthLinkController = new Elysia().post(
	'/authenticate',
	async ({ body, set }) => {
		const { email } = body;
		const createAuthLinkUseCase = new CreateAuthLinkUseCase(
			authLinksRepository,
			usersRepository,
			mailProvider,
		);

		set.status = 200;
		return await createAuthLinkUseCase.execute(email);
	},
	{
		body: t.Object({
			email: t.String({
				minLength: 1,
				error: 'Email é obrigatório e deve ser válido',
				examples: ['julioalmeida@pizzahut.com'],
				format: 'email',
			}),
		}),
		detail: {
			tags: ['Auth'],
		},
	},
);
