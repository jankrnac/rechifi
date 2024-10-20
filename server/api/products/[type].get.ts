import {  eq, desc, inArray } from 'drizzle-orm';

export default eventHandler(async (event) => {

    const query = getQuery(event)
    const type = getRouterParam(event, 'type')

    let orderColumn = tables.products.id

    if(query.sort == 'title')
    {
        orderColumn = tables.products.title
    }
    else if(query.sort == 'releaseDate')
    {
        orderColumn = tables.products.releaseDate
    }

    let products = await useDrizzle().query.products.findMany({
        where: and(
            type != 'all' ? eq(tables.products.type, type) : undefined,
            query.brand ? (Array.isArray(query.brand) ? inArray(tables.products.brand, query.brand) : eq(tables.products.brand, query.brand)) : undefined,
        ),
        orderBy: [desc(orderColumn)],
    })

    return products
})