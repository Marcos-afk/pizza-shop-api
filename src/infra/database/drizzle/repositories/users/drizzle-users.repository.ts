import { UserEntity } from '@application/users/entities/user.entity';
import type { UsersRepository } from '@application/users/repositories/users.repository';
import type { db } from '../../connection';

export class DrizzleUsersRepository implements UsersRepository {
	constructor(private readonly database: typeof db) {}

	async findByEmail(email: string): Promise<UserEntity | null> {
		const user = await this.database.query.UsersSchema.findFirst({
			where(fields, { eq }) {
				return eq(fields.email, email);
			},
		});

		return user ? new UserEntity(user) : null;
	}
}
