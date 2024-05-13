import type { CreateAuthLinkDTO } from '../dtos/create-auth-link.dto';
import type { AuthLinkEntity } from '../entities/auth-link.entity';

export interface AuthLinksRepository {
	findByUserIdAndCode(
		user_id: string,
		code: string,
	): Promise<AuthLinkEntity | null>;

	findByCode(code: string): Promise<AuthLinkEntity | null>;

	create(data: CreateAuthLinkDTO): Promise<AuthLinkEntity>;
}
