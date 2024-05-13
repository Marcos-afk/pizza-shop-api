import Elysia from 'elysia';
import { CreateAuthLinkController } from './create-auth-link.controller';

export const AuthController = new Elysia().use(CreateAuthLinkController);
