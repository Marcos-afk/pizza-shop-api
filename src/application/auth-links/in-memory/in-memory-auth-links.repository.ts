import type { CreateAuthLinkDTO } from '../dtos/create-auth-link.dto';
import { AuthLinkEntity } from '../entities/auth-link.entity';
import type { AuthLinksRepository } from '../repositories/auth-links.repository';

export class InMemoryAuthLinksRepository implements AuthLinksRepository {
	private readonly authLinks: AuthLinkEntity[] = [];

	async findByUserIdAndCode(
		user_id: string,
		code: string,
	): Promise<AuthLinkEntity | null> {
		const authLink = this.authLinks.find(
			(authLink) => authLink.user_id === user_id && authLink.code === code,
		);

		return authLink ? new AuthLinkEntity(authLink) : null;
	}

	async findByCode(code: string): Promise<AuthLinkEntity | null> {
		const authLink = this.authLinks.find((authLink) => authLink.code === code);

		return authLink ? new AuthLinkEntity(authLink) : null;
	}

	async create(data: CreateAuthLinkDTO): Promise<AuthLinkEntity> {
		const authLink = new AuthLinkEntity(data);

		this.authLinks.push(authLink);

		return authLink;
	}

	async remove(id: string): Promise<void> {
		const index = this.authLinks.findIndex((a) => a.id === id);

		this.authLinks.splice(index, 1);
	}
}
