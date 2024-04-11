import { logsAdapter } from '@common/adapters/api-logs/logs.adapter';
import { Elysia } from 'elysia';
import { env } from 'src/env';

const app = new Elysia();

app.listen(env.API_PORT as string, (callback) => {
	logsAdapter.success('Server', `Server is running on ${callback.url}`);
});
