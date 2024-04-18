import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from 'src/env';
import { logsAdapter } from '@common/adapters/api-logs/logs.adapter';
import { usersSeed } from './users/users.seed';

const runSeeds = async () => {
	const connection = postgres(env.DATABASE_URL, { max: 1 });
	const db = drizzle(connection);

	try {
		await db.transaction(async (db) => {
			await usersSeed(db);
		});

		logsAdapter.info('Success in seeding', 'Seed completed successfully');

		await connection.end();
		process.exit(0);
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: 'Erro ao executar a migração, tentando novamente mais tarde';

		logsAdapter.error('Error on migrate', message);
		process.exit(1);
	}
};

runSeeds();
