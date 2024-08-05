import type { UserIdDTO } from '@application/users/dtos/user-id.dto';
import type { UsersRepository } from '@application/users/repositories/users.repository';
import { NotFoundError } from '@common/errors/app.error';

export class FindUserByIdUseCase {
	constructor(private readonly usersRepository: UsersRepository) {}

	async execute({ id }: UserIdDTO) {
		const user = await this.usersRepository.findById(id);
		if (!user) {
			throw new NotFoundError('Usuário não encontrado');
		}

		return user;
	}
}
