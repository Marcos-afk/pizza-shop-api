import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { AuthLinksSchema } from '../auth-links/auth-links.schema';
import { OrderSchema } from '../orders/orders.schema';
import { RestaurantsSchema } from '../restaurants/restaurants.schema';

export const UserRoleEnum = pgEnum('user_role', ['manager', 'user']);

export const UsersSchema = pgTable('users', {
	id: text('id')
		.$defaultFn(() => createId())
		.primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	phone: text('phone').notNull().unique(),
	avatar: text('avatar'),
	role: UserRoleEnum('role').default('user'),
	created_at: timestamp('created_at').notNull().defaultNow(),
	updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const usersRelations = relations(UsersSchema, ({ one, many }) => ({
	codes: many(AuthLinksSchema),
	managed_restaurant: one(RestaurantsSchema, {
		fields: [UsersSchema.id],
		references: [RestaurantsSchema.id],
		relationName: 'managed_restaurant',
	}),
	order: many(OrderSchema),
}));
