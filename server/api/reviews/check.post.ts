export default eventHandler(async (event) => {

    const body = await readBody(event)

    let reviews = await useDrizzle().query.posts.findMany({
        where: and(
            eq(tables.posts.type, 'review'),
            eq(tables.posts.productId, body.productId),
            eq(tables.posts.userId, body.userId),
        )
    })

    return reviews
})