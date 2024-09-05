import {  inArray, desc } from 'drizzle-orm';

export default eventHandler(async (event) => {

    const query = getQuery(event)

    let articles = await useDrizzle().query.posts.findMany({
        with: {
            user: true,
            cover: true
        },
        where: query && query.type ? inArray(tables.posts.type, [query.type]) : inArray(tables.posts.type, ['article', 'review']),
        orderBy: [desc(tables.posts.id)],


    })

    return articles
})