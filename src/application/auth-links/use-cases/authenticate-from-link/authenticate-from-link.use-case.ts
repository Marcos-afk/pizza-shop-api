import type { AuthenticateFromLinkDTO } from '@application/auth-links/dtos/authenticate-from-link.dto';
import type { AuthLinksRepository } from '@application/auth-links/repositories/auth-links.repository';
import type { RestaurantsRepository } from '@application/restaurants/repositories/restaurants.repository';
import { AppError } from '@common/errors/app.error';
import type { DateProviderProps } from '@infra/providers/date/types/date.provider-props';
import { sign } from 'jsonwebtoken';
import { env } from 'src/env';

export class AuthenticateFromLinkUseCase {
	constructor(
		private readonly authLinksRepository: AuthLinksRepository,
		private readonly dateProvider: DateProviderProps,
		private readonly restaurantsRepository: RestaurantsRepository,
	) {}

	async execute({ code }: AuthenticateFromLinkDTO) {
		const userCode = await this.authLinksRepository.findByCode(code);

		if (!userCode) {
			throw new AppError('Código não encontrado', 404);
		}

		const daysSinceAuthLinkWasCreated = this.dateProvider.compareInDays(
			userCode.created_at,
			this.dateProvider.dateNow(),
		);

		if (daysSinceAuthLinkWasCreated > 7) {
			throw new AppError('Código expirado');
		}

		const restaurant =
			await this.restaurantsRepository.findRestaurantByManagerId(
				userCode.user_id,
			);

		const token = sign(
			{
				sub: userCode.user_id,
				restaurant_id: restaurant?.id,
			},
			env.JWT_SECRET,
			{
				expiresIn: '7d',
			},
		);

		await this.authLinksRepository.remove(userCode.id);

		return {
			token,
		};
	}
}
