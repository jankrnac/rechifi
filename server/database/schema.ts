import { sqliteTable, text, integer, unique, AnySQLiteColumn } from 'drizzle-orm/sqlite-core'
import { sql, relations  } from "drizzle-orm";

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    username: text('username').unique(),
    email: text('email'),
    password: text('password'),
    avatarId: integer('avatarId').references(() => files.id, {onDelete: 'cascade'}),
    name: text('name'),
    other: text('other'),
    iems: text('iems', {mode: 'json'}),
    daps: text('daps', {mode: 'json'}),
    dacs: text('dacs', {mode: 'json'}),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})

export const posts = sqliteTable('posts', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull().unique(),
    title: text('tile').notNull(),
    type: text('type').notNull(),
    brand: text('brand'),
    model: text('model'),
    gearType: text('gearType'),
    description: text('description'),
    userId: integer('userId').references(() => users.id, {onDelete: 'cascade'}),
    coverId: integer('coverId').references(() => files.id, {onDelete: 'cascade'}),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),

})

export const files = sqliteTable('files', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    filename: text('filename'),
    type: text('type'),
    order: integer('order').default(0),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})

export const elements = sqliteTable('elements', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    data: text('data', {mode: 'json'}),
    postId: integer('postId').references(() => posts.id, {onDelete: 'cascade'}),
    type: text('type'),
    order: integer('order').default(0),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})

export const comments = sqliteTable('comments', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    text: text('text'),
    postId: integer('postId').references(() => posts.id, {onDelete: 'cascade'}),
    userId: integer('userId').references(() => users.id, {onDelete: 'cascade'}),
    parentId: integer('parentId').references((): AnySQLiteColumn => comments.id, {onDelete: 'cascade'}),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})

export const likes = sqliteTable('likes', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    postId: integer('postId').references(() => posts.id, {onDelete: 'cascade'}),
    userId: integer('userId').references(() => users.id, {onDelete: 'cascade'}),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})


export const postsRelations = relations(posts, ({one,  many }) => ({
    elements: many(elements),
    comments: many(comments),
    likes: many(likes),
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

export const elementsRelations = relations(elements, ({ one }) => ({
    post: one(posts, {
      fields: [elements.postId],
      references: [posts.id],
    }),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
    post: one(posts, {
      fields: [comments.postId],
      references: [posts.id],
    }),
}));


export const likesRelations = relations(likes, ({ one }) => ({
    post: one(posts, {
      fields: [likes.postId],
      references: [posts.id],
    }),
}));

