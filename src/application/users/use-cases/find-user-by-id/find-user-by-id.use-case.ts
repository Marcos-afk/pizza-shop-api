import type { UserIdDTO } from '@application/users/dtos/user-id.dto';
import type { UsersRepository } from '@application/users/repositories/users.repository';
import { AppError } from '@common/errors/app.error';

export class FindUserByIdUseCase {
	constructor(private readonly usersRepository: UsersRepository) {}

	async execute({ id }: UserIdDTO) {
		const user = await this.usersRepository.findById(id);
		if (!user) {
			throw new AppError('Usuário não encontrado', 404);
		}

		return user;
	}
}
