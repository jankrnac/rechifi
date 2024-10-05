import {  inArray, desc, isNull } from 'drizzle-orm';

export default eventHandler(async (event) => {

    const query = getQuery(event)

    let articles = await useDrizzle().query.posts.findMany({
        with: {
            user: true,
            cover: true,
            likes: true
        },
        where: and( 
            query && query.type ? inArray(tables.posts.type, [query.type]) : inArray(tables.posts.type, ['article', 'review']),
            query && query.gearType ? or(inArray(tables.posts.gearType, [].concat(query.gearType)), isNull(tables.posts.gearType)): or(inArray(tables.posts.gearType, ['iem', 'dap','dac']), isNull(tables.posts.gearType)),
            eq(tables.posts.published, true)
        ),
        orderBy: [desc(tables.posts.id)],


    })

    return articles
})