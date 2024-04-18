import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { env } from 'src/env';
import { logsAdapter } from '@common/adapters/api-logs/logs.adapter';

const maxTimeout = 1000 * 60 * 2; // 2 minutes

const generateMigration = async () => {
	const connection = postgres(env.DATABASE_URL, { max: 1 });
	const db = drizzle(connection);

	const finishMigration = async () => {
		logsAdapter.info(
			'Success in generating migration',
			'Migration completed successfully',
		);

		await connection.end();
		process.exit(0);
	};

	try {
		await Promise.race([
			migrate(db, { migrationsFolder: 'drizzle' }),
			new Promise((resolve, reject) => {
				setTimeout(() => {
					reject(new Error('Migration timed out'));
				}, maxTimeout);
			}),
		]);
		await finishMigration();
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: 'Erro ao executar a migração, tentando novamente mais tarde';

		logsAdapter.error('Error on migrate', message);
		process.exit(1);
	}
};

generateMigration();
