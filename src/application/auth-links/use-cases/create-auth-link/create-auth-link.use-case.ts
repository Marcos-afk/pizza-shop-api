import type { AuthLinksRepository } from '@application/auth-links/repositories/auth-links.repository';
import type { UsersRepository } from '@application/users/repositories/users.repository';
import { AppError } from '@common/errors/app.error';
import { createId } from '@paralleldrive/cuid2';
import { env } from 'src/env';

export class CreateAuthLinkUseCase {
	constructor(
		private readonly authLinksRepository: AuthLinksRepository,
		private readonly usersRepository: UsersRepository,
	) {}

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
			throw new AppError('Usuário não encontrado', 404);
		}

		const { code } = await this.authLinksRepository.create({
			user_id: user.id,
			code: await this.generateCode(),
		});

		const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL);

		authLink.searchParams.set('code', code);
		authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL);

		return authLink;
	}
}
