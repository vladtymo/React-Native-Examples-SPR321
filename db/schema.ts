import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const colorsTable = sqliteTable('colors', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('value').notNull()
});

// Export Task to use as an interface in your app
export type Color = typeof colorsTable.$inferSelect;