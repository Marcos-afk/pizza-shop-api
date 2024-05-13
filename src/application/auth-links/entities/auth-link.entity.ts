export class AuthLinkEntity {
	id: string;
	user_id: string;
	code: string;
	created_at: Date;
	updated_at: Date;

	constructor(partial: Partial<AuthLinkEntity>) {
		Object.assign(this, partial);
	}
}
