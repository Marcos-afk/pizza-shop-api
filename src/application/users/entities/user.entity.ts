export class UserEntity {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar?: string | null;
	role: 'manager' | 'user' | null;
	created_at: Date;
	updated_at: Date;

	constructor(partial: Partial<UserEntity>) {
		Object.assign(this, partial);
	}
}
