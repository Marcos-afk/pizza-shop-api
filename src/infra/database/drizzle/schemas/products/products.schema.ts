import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { OrderItemsSchema } from '../orders/order-items.schema';
import { RestaurantsSchema } from '../restaurants/restaurants.schema';

export const ProductsSchema = pgTable('products', {
	id: text('id')
		.$defaultFn(() => createId())
		.primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	price_in_cents: integer('prince_in_cents').notNull(),
	restaurant_id: text('restaurant_id')
		.notNull()
		.references(() => RestaurantsSchema.id),
	created_at: timestamp('created_at').notNull().defaultNow(),
	updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const ProductsRelations = relations(ProductsSchema, ({ one, many }) => {
	return {
		restaurant: one(RestaurantsSchema, {
			fields: [ProductsSchema.restaurant_id],
			references: [RestaurantsSchema.id],
			relationName: 'product_restaurant',
		}),
		order_items: many(OrderItemsSchema),
	};
});
