export default eventHandler(async (event) => {

    const slug = getRouterParam(event, 'slug')

    let article = await useDrizzle().query.posts.findFirst({
        where: and(
            eq(tables.posts.type, 'article'),
            eq(tables.posts.slug, slug)
        ),
        with: {
            elements: true,
            comments: true
        }
    })

    return article
})