import type { H3Event } from "h3";

import {  inArray, desc } from 'drizzle-orm';

export default cachedEventHandler(async (event) => {

    const query = getQuery(event)

    let articles = await useDrizzle().query.posts.findMany({
        with: {
            user: true,
            cover: true
        },
        where: and( 
            query && query.type ? inArray(tables.posts.type, [query.type]) : inArray(tables.posts.type, ['article', 'review']),
            query && query.gearType ? inArray(tables.posts.gearType, query.gearType) : inArray(tables.posts.gearType, ['iem', 'dap','dac']),
        ),
        orderBy: [desc(tables.posts.id)],


    })

    return articles
}, {
    maxAge: 60 * 30,
    swr: true,
    staleMaxAge: 60 * 60,
    getKey: (event: H3Event) => event.path
})