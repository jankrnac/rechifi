export default eventHandler(async (event) => {

    const query = getQuery(event)

    let articles = await useDrizzle().query.posts.findMany({
        where: and(
            eq(tables.posts.type, 'review'),
            eq(tables.posts.brand, query.brand),
            eq(tables.posts.model, query.model),

        )
    })

    return articles
})