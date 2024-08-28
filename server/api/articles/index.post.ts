export default eventHandler(async (event) => {
    
    const body = await readBody(event)

    const article = await useDrizzle().insert(tables.posts).values({
        type: 'article',
        title: body.title,
        slug: $slugify(body.title)
    }).returning().get()


    return article
})