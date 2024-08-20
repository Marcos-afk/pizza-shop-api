export class RestaurantEntity {
	id: string;
	name: string;
	logo?: string | null;
	cover?: string | null;
	description: string;
	manager_id: string;
	created_at: Date;
	updated_at: Date;

	constructor(partial: Partial<RestaurantEntity>) {
		Object.assign(this, partial);
	}
}
