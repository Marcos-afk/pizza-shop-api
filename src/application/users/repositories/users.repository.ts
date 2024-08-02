import type { UserEntity } from '../entities/user.entity';

export interface UsersRepository {
	findByEmail(email: string): Promise<UserEntity | null>;
	findById(id: string): Promise<UserEntity | null>;
}
