import { gte, lte, isNull } from 'drizzle-orm'


export default eventHandler(async (event) => {

    var d = Date.now() + -5*24*3600*1000;

    let products = await useDrizzle().query.products.findMany({
        where: or(
            isNull(tables.products.releaseDate),
            gte(tables.products.releaseDate, new Date().toISOString().split('T')[0]),
            gte(tables.products.releaseDate, new Date(d).toISOString().split('T')[0]),
        )
    })

    return products
})