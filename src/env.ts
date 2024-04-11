import { logsAdapter } from '@common/adapters/api-logs/logs.adapter';
import { z } from 'zod';

const envSchema = z.object({
	API_PORT: z
		.string()
		.min(1, { message: 'API_PORT é obrigatória' })
		.default('5000'),
	NODE_ENV: z
		.enum(['development', 'production', 'test'], {
			errorMap: (issue) => {
				switch (issue.code) {
					case 'invalid_type':
						return { message: 'Ambiente de desenvolvimento inválido' };
					case 'invalid_enum_value':
						return { message: 'Ambiente de desenvolvimento inválido' };
					default:
						return { message: 'Ambiente de desenvolvimento inválido' };
				}
			},
		})
		.default('development'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	logsAdapter.error(
		'Environment variables',
		JSON.stringify(parsedEnv.error.flatten().fieldErrors),
	);

	process.exit(1);
}

export const env = parsedEnv.data;