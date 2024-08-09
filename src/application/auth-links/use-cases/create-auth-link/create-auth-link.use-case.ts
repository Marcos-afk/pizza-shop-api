import type { AuthLinksRepository } from '@application/auth-links/repositories/auth-links.repository';
import type { UsersRepository } from '@application/users/repositories/users.repository';
import { NotFoundError } from '@common/errors/app.error';
import type { MailProviderProps } from '@infra/providers/mail/types/mail.provider-props';
import { createId } from '@paralleldrive/cuid2';
import { env } from 'src/env';

export class CreateAuthLinkUseCase {
	constructor(
		private readonly authLinksRepository: AuthLinksRepository,
		private readonly usersRepository: UsersRepository,
		private readonly mailProvider: MailProviderProps,
	) {}

	private async sendAuthEmailToUser(name: string, email: string, url: URL) {
		await this.mailProvider.execute({
			to: { name, email },
			subject: 'Email de autenticação',
			templateVariables: {
				title: 'Recebemos uma solicitação de autenticação!',
				message: `Olá, ${name}!
          <br/><br/>
          Recebemos uma solicitação de autenticação para a sua conta no Pizza shop.
          <br/><br/>
          Para realizar a autenticação, clique no botão que está no final deste email.
          <br/><br/>
          Com atenção,
          Equipe Pizza shop.`,
				label: 'Autentificar',
				link: `${url}`,
			},
		});
	}

	private async generateCode() {
		const code = createId();

		const authLink = await this.authLinksRepository.findByCode(code);
		if (authLink) {
			return this.generateCode();
		}

		return code;
	}

	async execute(email: string) {
		const user = await this.usersRepository.findByEmail(email);
		if (!user) {
			throw new NotFoundError('Usuário não encontrado');
		}

		const { code } = await this.authLinksRepository.create({
			user_id: user.id,
			code: await this.generateCode(),
		});

		const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL);

		authLink.searchParams.set('code', code);
		authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL);

		return await this.sendAuthEmailToUser(user.name, user.email, authLink);
	}
}
