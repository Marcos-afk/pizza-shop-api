import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { OrderSchema } from '../orders/orders.schema';
import { ProductsSchema } from '../products/products.schema';
import { UsersSchema } from '../users/users.schema';

export const RestaurantsSchema = pgTable('restaurants', {
	id: text('id')
		.$defaultFn(() => createId())
		.primaryKey(),
	name: text('name').notNull(),
	logo: text('logo'),
	cover: text('cover'),
	description: text('description').notNull(),
	manager_id: text('manager_id')
		.notNull()
		.references(() => UsersSchema.id),
	created_at: timestamp('created_at').notNull().defaultNow(),
	updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const RestaurantsRelations = relations(
	RestaurantsSchema,
	({ one, many }) => {
		return {
			manager: one(UsersSchema, {
				fields: [RestaurantsSchema.manager_id],
				references: [UsersSchema.id],
				relationName: 'restaurant_manager',
			}),
			orders: many(OrderSchema),
			products: many(ProductsSchema),
		};
	},
);
