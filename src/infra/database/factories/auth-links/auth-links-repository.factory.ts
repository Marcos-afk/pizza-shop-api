import { InMemoryAuthLinksRepository } from '@application/auth-links/in-memory/in-memory-auth-links.repository';
import type { AuthLinksRepository } from '@application/auth-links/repositories/auth-links.repository';
import { db } from '@infra/database/drizzle/connection';
import { DrizzleAuthLinksRepository } from '@infra/database/drizzle/repositories/auth-links/drizzle-auth-links.repository';
import { env } from 'src/env';

let authLinksRepositoryInstance: AuthLinksRepository | null = null;
export const AuthLinksRepositoryFactory = () => {
	if (!authLinksRepositoryInstance) {
		switch (env.NODE_ENV) {
			case 'development': {
				authLinksRepositoryInstance = new DrizzleAuthLinksRepository(db);
				break;
			}

			case 'production': {
				authLinksRepositoryInstance = new DrizzleAuthLinksRepository(db);
				break;
			}

			case 'test': {
				authLinksRepositoryInstance = new InMemoryAuthLinksRepository();
				break;
			}

			default: {
				authLinksRepositoryInstance = new InMemoryAuthLinksRepository();
				break;
			}
		}
	}

	return authLinksRepositoryInstance;
};
