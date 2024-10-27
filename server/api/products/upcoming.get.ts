export default eventHandler(async (event) => {

    let products = await useDrizzle().query.products.findMany({
        where: eq(tables.products.released, false)
    })

    return products
})