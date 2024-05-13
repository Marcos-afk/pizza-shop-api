import { InMemoryUsersRepository } from '@application/users/in-memory/in-memory-users.repository';
import type { UsersRepository } from '@application/users/repositories/users.repository';
import { db } from '@infra/database/drizzle/connection';
import { DrizzleUsersRepository } from '@infra/database/drizzle/repositories/users/drizzle-users.repository';
import { env } from 'src/env';

let usersRepositoryInstance: UsersRepository | null = null;

export const UsersRepositoryFactory = () => {
	if (!usersRepositoryInstance) {
		switch (env.NODE_ENV) {
			case 'development': {
				usersRepositoryInstance = new DrizzleUsersRepository(db);
				break;
			}

			case 'production': {
				usersRepositoryInstance = new DrizzleUsersRepository(db);
				break;
			}

			case 'test': {
				usersRepositoryInstance = new InMemoryUsersRepository();
				break;
			}

			default: {
				usersRepositoryInstance = new InMemoryUsersRepository();
				break;
			}
		}
	}

	return usersRepositoryInstance;
};
