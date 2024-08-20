import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { ProductsSchema } from '../products/products.schema';
import { OrderSchema } from './orders.schema';

export const OrderItemsSchema = pgTable('order_items', {
	id: text('id')
		.$defaultFn(() => createId())
		.primaryKey(),
	order_id: text('order_id')
		.notNull()
		.references(() => OrderSchema.id, { onDelete: 'cascade' }),
	product_id: text('product_id')
		.notNull()
		.references(() => ProductsSchema.id, { onDelete: 'set null' }),
	price_in_cents: integer('price_in_cents').notNull(),
	quantity: integer('quantity').notNull(),
	created_at: timestamp('created_at').notNull().defaultNow(),
	updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const OrderItemsRelations = relations(OrderItemsSchema, ({ one }) => {
	return {
		order: one(OrderSchema, {
			fields: [OrderItemsSchema.order_id],
			references: [OrderSchema.id],
			relationName: 'items_order',
		}),
		product: one(ProductsSchema, {
			fields: [OrderItemsSchema.order_id],
			references: [ProductsSchema.id],
			relationName: 'items_product',
		}),
	};
});
