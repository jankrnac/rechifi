import {  eq, desc, asc, inArray } from 'drizzle-orm';

export default eventHandler(async (event) => {

    const query = getQuery(event)
    const type = getRouterParam(event, 'type')

    let orderColumn = asc(tables.products.title)

    if(query.sort == 'title')
    {
        orderColumn = asc(tables.products.title)
    }
    else if(query.sort == 'releaseDate')
    {
        orderColumn = desc(tables.products.releaseDate)
    }

    let products = await useDrizzle().query.products.findMany({
        where: and(
            eq(tables.products.type, type),
            query.brand ? (Array.isArray(query.brand) ? inArray(tables.products.brand, query.brand) : eq(tables.products.brand, query.brand)) : undefined,
        ),
        with: {
            likes: true
        },
        limit: 20,
        offset: 20*(query.page - 1),
        orderBy: [orderColumn],
    })

    function intersect(a, b) {
        var setB = new Set(b);
        return [...new Set(a)].filter(x => setB.has(x)).length
    }

    if(query.drivers) 
    {
        products = products.filter(product => intersect(product.drivers.map(e=>e.value), [query.drivers].flat()))
    }

    return products

})