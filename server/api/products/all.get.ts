import { desc } from 'drizzle-orm'


export default eventHandler(async (event) => {

    const query = getQuery(event)

    let products = await useDrizzle().query.products.findMany({
        where: query.type ? eq(tables.products.type, query.type) : undefined,
        orderBy: [desc(tables.products.id)]
    })

    return products
})