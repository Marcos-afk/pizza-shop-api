import Elysia from 'elysia';
import { AuthenticateFromLinkController } from './authenticate-from-link.controller';
import { CreateAuthLinkController } from './create-auth-link.controller';
import { signOutController } from './sign-out.controller';

export const AuthController = new Elysia()
	.use(CreateAuthLinkController)
	.use(AuthenticateFromLinkController)
	.use(signOutController);
