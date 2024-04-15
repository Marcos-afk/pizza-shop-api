import type { Config } from 'drizzle-kit';

export default {
	schema: './src/infra/database/drizzle/schemas/index.ts',
	out: './drizzle',
	driver: 'pg',
} satisfies Config;
