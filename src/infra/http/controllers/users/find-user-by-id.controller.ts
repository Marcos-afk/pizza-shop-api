import { FindUserByIdUseCase } from '@application/users/use-cases/find-user-by-id/find-user-by-id.use-case';
import { auth } from '@infra/auth/auth';
import { UsersRepositoryFactory } from '@infra/database/factories/users/users-repository.factory';
import Elysia from 'elysia';

const usersRepository = UsersRepositoryFactory();

export const FindLoggedUserProfileController = new Elysia().use(auth).get(
	'/users/profile',
	async ({ findLoggedUser, set }) => {
		const { user_id } = await findLoggedUser();

		const findUserByIdUseCase = new FindUserByIdUseCase(usersRepository);

		const user = await findUserByIdUseCase.execute({ id: user_id });

		set.status = 200;

		return { user };
	},
	{
		detail: { tags: ['Users'] },
	},
);
