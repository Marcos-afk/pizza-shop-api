import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { UsersSchema } from '../users/users.schema';
import { relations } from 'drizzle-orm';

export const AuthLinksSchema = pgTable('auth_links', {
	id: text('id')
		.$defaultFn(() => createId())
		.primaryKey(),
	code: text('code').notNull().unique(),
	user_id: text('user_id')
		.notNull()
		.references(() => UsersSchema.id),
	created_at: timestamp('created_at').notNull().defaultNow(),
	updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const AuthLinksRelations = relations(AuthLinksSchema, ({ one }) => {
	return {
		user: one(UsersSchema, {
			fields: [AuthLinksSchema.user_id],
			references: [UsersSchema.id],
			relationName: 'user_auth_links',
		}),
	};
});
