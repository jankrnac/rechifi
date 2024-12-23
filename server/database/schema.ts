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
    activated: integer('activated', { mode: 'boolean' }).default(false),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})

export const tokens = sqliteTable('tokens', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('userId').references(() => users.id, {onDelete: 'cascade'}),
    value: text('value').notNull(),
    type: text('type'),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
    activatedAt: text("activatedAt")
})

export const posts = sqliteTable('posts', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull().unique(),
    title: text('tile').notNull(),
    type: text('type').notNull(),
    productSlug: text('productSlug'),
    gearType: text('gearType'),
    productId: integer('productId').references(() => products.id, {onDelete: 'cascade'}),
    description: text('description'),
    published: integer('published', { mode: 'boolean' }).default(false),
    userId: integer('userId').references(() => users.id, {onDelete: 'cascade'}),
    coverId: integer('coverId').references(() => files.id, {onDelete: 'cascade'}),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),

})

export const products = sqliteTable('products', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull(),
    brand: text('brand').notNull(),
    model: text('model').notNull(),
    title: text('title').notNull(),
    type: text('type'),
    priceRange: text('priceRange'),
    drivers: text('drivers', { mode: 'json' }),
    released: integer('released', { mode: 'boolean' }).default(true),
    releaseDate: text("releaseDate"),
    showInIndex: integer('showInIndex', { mode: 'boolean' }).default(true),
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
    productId: integer('productId').references(() => products.id, {onDelete: 'cascade'}),
    userId: integer('userId').references(() => users.id, {onDelete: 'cascade'}),
    parentId: integer('parentId').references((): AnySQLiteColumn => comments.id, {onDelete: 'cascade'}),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})

export const likes = sqliteTable('likes', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    postId: integer('postId').references(() => posts.id, {onDelete: 'cascade'}),
    userId: integer('userId').references(() => users.id, {onDelete: 'cascade'}),
    guestId: text('guestId'),
    productId: integer('productId').references(() => products.id, {onDelete: 'cascade'}),
    commentId: integer('commentId').references(() => comments.id, {onDelete: 'cascade'}),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})


export const heroes = sqliteTable('heroes', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    postId: integer('postId').references(() => posts.id, {onDelete: 'cascade'}),
    productId: integer('productId').references(() => products.id, {onDelete: 'cascade'}),
    order: integer('order').default(0),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})

export const postsRelations = relations(posts, ({one,  many }) => ({
    elements: many(elements),
    comments: many(comments),
    likes: many(likes),
    hero: one(heroes),
    user: one(users, {
        fields: [posts.userId],
        references: [users.id],
    }),
    product: one(products, {
        fields: [posts.productId],
        references: [products.id],
    }),
    cover: one(files, {
        fields: [posts.coverId],
        references: [files.id]
    })
}));

export const productsRelations = relations(products, ({ one, many }) => ({
    comments: many(comments),
    likes: many(likes),
    posts: many(posts),
    hero: one(heroes, {
        fields: [products.id],
        references: [heroes.productId],
    })
}));

export const usersRelations = relations(users, ({one,  many }) => ({
    avatar: one(files, {
        fields: [users.avatarId],
        references: [files.id]
    }),
    posts: many(posts),
    token: one(tokens),
    usersToProducts: many(usersToProducts)
}));

export const elementsRelations = relations(elements, ({ one }) => ({
    post: one(posts, {
      fields: [elements.postId],
      references: [posts.id],
    })
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
    post: one(posts, {
      fields: [comments.postId],
      references: [posts.id],
    }),
    user: one(users, {
        fields: [comments.userId],
        references: [users.id],
    }),
    likes: many(likes)
}));

export const likesRelations = relations(likes, ({ one }) => ({
    post: one(posts, {
        fields: [likes.postId],
        references: [posts.id],
    }),
    comment: one(comments, {
        fields: [likes.commentId],
        references: [comments.id],
    }),
    product: one(products, {
        fields: [likes.productId],
        references: [products.id],
    }),
}));

export const heroesRelations = relations(heroes, ({ one }) => ({
    post: one(posts, {
        fields: [heroes.postId],
        references: [posts.id],
    }),
    product: one(products, {
        fields: [heroes.productId],
        references: [products.id],
    }),
}));


export const tokensRelations = relations(tokens, ({ one }) => ({
    user: one(users, {
      fields: [tokens.userId],
      references: [users.id],
    }),
}));


export const usersToProducts = sqliteTable('usersToProducts', {
    userId: integer('userId').references(() => users.id, { onDelete: 'cascade'}),
    productId: integer('productId').references(() => products.id, { onDelete: 'cascade'}),  
  }, (t) => ({
    unq: unique().on(t.userId, t.productId)
}))
  
export const usersToProductsRelations = relations(usersToProducts, ({ one }) => ({
    user: one(users, {
        fields: [usersToProducts.userId],
        references: [users.id],
    }),
    product: one(products, {
        fields: [usersToProducts.productId],
        references: [products.id],
    }),
}));