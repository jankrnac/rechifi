import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core'
import { sql, relations  } from "drizzle-orm";

export const users = sqliteTable('articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('tile').notNull(),

  createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})


export const files = sqliteTable('files', {

    id: integer('id').primaryKey({ autoIncrement: true }),
    cloudId: text('cloudId'),
    type: text('type'),
    order: integer('order').default(0),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})

export const elements = sqliteTable('elements', {

    id: integer('id').primaryKey({ autoIncrement: true }),
    path: text('path'),
    cloudId: text('cloudId'),
    type: text('type'),
    order: integer('order').default(0),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})
  