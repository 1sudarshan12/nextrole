import { sqliteTable, text, index } from 'drizzle-orm/sqlite-core';
export const opportunities = sqliteTable('opportunities', {
 id: text('id').primaryKey(), userId: text('user_id').notNull(), payload: text('payload').notNull(),
 createdAt: text('created_at').notNull(), updatedAt: text('updated_at').notNull(),
}, (table) => [index('opportunities_user_idx').on(table.userId)]);
export const preferences = sqliteTable('preferences', {
 userId: text('user_id').primaryKey(), payload: text('payload').notNull(), updatedAt: text('updated_at').notNull(),
});
