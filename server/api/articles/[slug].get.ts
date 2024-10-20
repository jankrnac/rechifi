import {  asc, desc } from 'drizzle-orm';

export default eventHandler(async (event) => {

    const slug = getRouterParam(event, 'slug')

    let article = await useDrizzle().query.posts.findFirst({
        where: and(
            eq(tables.posts.type, 'article'),
            eq(tables.posts.slug, slug)
        ),
        with: {
            elements: {
                orderBy: asc(tables.elements.order)
            },
            comments: true,
            user: true,
            cover: true,
            likes: true
        }
    })

    return article
})