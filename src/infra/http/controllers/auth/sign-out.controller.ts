import { auth } from '@infra/auth/auth';
import Elysia from 'elysia';

export const signOutController = new Elysia().use(auth).post(
	'/sign-out',
	async ({ signOut: internalSignOut }) => {
		internalSignOut();
	},
	{ detail: { tags: ['Auth'] } },
);
