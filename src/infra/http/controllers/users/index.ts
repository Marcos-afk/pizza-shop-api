import Elysia from 'elysia';
import { FindLoggedUserProfileController } from './find-user-by-id.controller';

export const UsersController = new Elysia().use(
	FindLoggedUserProfileController,
);
