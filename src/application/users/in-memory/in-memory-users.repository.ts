import { UserEntity } from '../entities/user.entity';
import type { UsersRepository } from '../repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
	private readonly users: UserEntity[] = [];

	async findByEmail(email: string): Promise<UserEntity | null> {
		const user = this.users.find((user) => user.email === email);

		return user ? new UserEntity(user) : null;
	}

	async findById(id: string): Promise<UserEntity | null> {
		const user = this.users.find((user) => user.id === id);

		return user ? new UserEntity(user) : null;
	}
}
