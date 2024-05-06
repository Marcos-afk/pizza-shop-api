export class RestaurantEntity {
	id: string;
	name: string;
	logo?: string | null;
	cover?: string | null;
	description: string;
	manager_id: string;
	created_at: Date;
	updated_at: Date;

	constructor(props: RestaurantEntity) {
		Object.assign(this, props);
	}
}
