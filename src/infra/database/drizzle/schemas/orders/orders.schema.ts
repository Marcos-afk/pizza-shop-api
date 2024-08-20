import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { RestaurantsSchema } from '../restaurants/restaurants.schema';
import { UsersSchema } from '../users/users.schema';
import { OrderItemsSchema } from './order-items.schema';

export const OrderStatusEnum = pgEnum('order_status', [
	'PENDING',
	'PROCESSING',
	'DELIVERING',
	'DELIVERED',
	'CANCELED',
]);

export const OrderSchema = pgTable('orders', {
	id: text('id')
		.$defaultFn(() => createId())
		.primaryKey(),
	customer_id: text('customer_id')
		.notNull()
		.references(() => UsersSchema.id),
	restaurant_id: text('restaurant_id')
		.notNull()
		.references(() => RestaurantsSchema.id),
	status: OrderStatusEnum('order_status').notNull().default('PENDING'),
	total_in_cents: integer('total_in_cents').notNull(),
	created_at: timestamp('created_at').notNull().defaultNow(),
	updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const OrdersRelations = relations(OrderSchema, ({ one, many }) => {
	return {
		customer: one(UsersSchema, {
			fields: [OrderSchema.customer_id],
			references: [UsersSchema.id],
			relationName: 'order_customer',
		}),
		restaurant: one(RestaurantsSchema, {
			fields: [OrderSchema.restaurant_id],
			references: [RestaurantsSchema.id],
			relationName: 'order_restaurant',
		}),
		order_items: many(OrderItemsSchema),
	};
});
