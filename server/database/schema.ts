import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core'
import { sql, relations  } from "drizzle-orm";

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    username: text('username').unique(),
    email: text('email'),
    password: text('password'),
    avatarId: integer('avatarId').references(() => files.id, {onDelete: 'cascade'}),
    name: text('name'),
    other: text('other'),
    iems: text('iems'),
    daps: text('daps'),
    dacs: text('dacs'),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})

export const posts = sqliteTable('posts', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull().unique(),
    title: text('tile').notNull(),
    type: text('type').notNull(),
    userId: integer('userId').references(() => users.id, {onDelete: 'cascade'}),
    coverId: integer('coverId').references(() => files.id, {onDelete: 'cascade'}),
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
    data: text('data'),
    postId: integer('postId').references(() => posts.id, {onDelete: 'cascade'}),
    type: text('type'),
    order: integer('order').default(0),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})

export const postsRelations = relations(posts, ({one,  many }) => ({
    elements: many(elements),
    user: one(users, {
        fields: [posts.userId],
        references: [users.id],
    }),
    cover: one(files, {
        fields: [posts.coverId],
        references: [files.id]
    })
}));

export const usersRelations = relations(users, ({one,  many }) => ({
    avatar: one(files, {
        fields: [users.avatarId],
        references: [files.id]
    }),
    posts: many(posts),

}));
