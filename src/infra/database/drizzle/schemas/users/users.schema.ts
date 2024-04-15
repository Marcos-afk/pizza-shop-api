import { createId } from '@paralleldrive/cuid2';
import {
	PgEnumColumn,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';

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
