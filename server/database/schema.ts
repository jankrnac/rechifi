import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core'
import { sql, relations  } from "drizzle-orm";

export const products = sqliteTable('products', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull().unique(),
    title: text('tile').notNull(),
    brand: text('brand').notNull(),
    model: text('model').notNull(),
    type: text('type').notNull(),
    coverId: integer('coverId').references(() => files.id, {onDelete: 'cascade'}),
    createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
})

export const productsRelations = relations(products, ({ many }) => ({
    fileProduct: many(fileProduct),
}));

export const fileProduct = sqliteTable('fileProduct', {
    fileId: integer('fileId').references(() => files.id, { onDelete: 'cascade'}),
    productId: integer('productId').references(() => products.id, { onDelete: 'cascade'}),  
}, (t) => ({
    unq: unique().on(t.fileId, t.productId)
}))

export const fileProductRelations = relations(fileProduct, ({ one }) => ({
    file: one(files, {
      fields: [fileProduct.fileId],
      references: [files.id],
    }),
    product: one(products, {
      fields: [fileProduct.productId],
      references: [products.id],
    }),
}));
  

export const posts = sqliteTable('posts', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull().unique(),
    title: text('tile').notNull(),
    type: text('type').notNull(),
    coverId: integer('coverId').references(() => files.id, {onDelete: 'cascade'}),
    productId: integer('productId').references(() => products.id, {onDelete: 'cascade'}),
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
    cover: one(files, {
        fields: [posts.coverId],
        references: [files.id]
    })
}));
