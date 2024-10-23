import {  inArray, desc, isNull } from 'drizzle-orm';

export default eventHandler(async (event) => {

    const query = getQuery(event)

    let posts = await useDrizzle().query.posts.findMany({
        with: {
            user: true,
            cover: true,
            likes: true
        },
        where: and( 
            query && query.type ? inArray(tables.posts.type, [query.type]) : inArray(tables.posts.type, ['article', 'review']),
            eq(tables.posts.published, true)
        ),
        orderBy: [desc(tables.posts.id)],
        limit: 20

    })

    let products = await useDrizzle().query.products.findMany({
        with: {
            likes: true
        },
        limit: 20
    })


    return posts.concat(products)
})
