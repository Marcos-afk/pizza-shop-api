import { UserEntity } from '../entities/user.entity';
import type { UsersRepository } from '../repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
	private readonly users: UserEntity[] = [];

	async findByEmail(email: string): Promise<UserEntity | null> {
		const user = this.users.find((user) => user.email === email);

		return user ? new UserEntity(user) : null;
	}
}
