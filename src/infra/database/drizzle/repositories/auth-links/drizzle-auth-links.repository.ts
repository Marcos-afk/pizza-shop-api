import type { CreateAuthLinkDTO } from '@application/auth-links/dtos/create-auth-link.dto';
import { AuthLinkEntity } from '@application/auth-links/entities/auth-link.entity';
import type { AuthLinksRepository } from '@application/auth-links/repositories/auth-links.repository';
import { eq } from 'drizzle-orm';
import type { db } from '../../connection';
import { AuthLinksSchema } from '../../schemas';

export class DrizzleAuthLinksRepository implements AuthLinksRepository {
	constructor(private readonly database: typeof db) {}

	async findByUserIdAndCode(
		user_id: string,
		code: string,
	): Promise<AuthLinkEntity | null> {
		const user = await this.database.query.AuthLinksSchema.findFirst({
			where(fields, { eq }) {
				return eq(fields.user_id, user_id) && eq(fields.code, code);
			},
		});

		return user ? new AuthLinkEntity(user) : null;
	}

	async findByCode(code: string): Promise<AuthLinkEntity | null> {
		const user = await this.database.query.AuthLinksSchema.findFirst({
			where(fields, { eq }) {
				return eq(fields.code, code);
			},
		});

		return user ? new AuthLinkEntity(user) : null;
	}

	async create(data: CreateAuthLinkDTO): Promise<AuthLinkEntity> {
		const authLink = await this.database
			.insert(AuthLinksSchema)
			.values(data)
			.returning();

		return new AuthLinkEntity(authLink[0]);
	}

	async remove(id: string): Promise<void> {
		await this.database
			.delete(AuthLinksSchema)
			.where(eq(AuthLinksSchema.id, id));
	}
}
