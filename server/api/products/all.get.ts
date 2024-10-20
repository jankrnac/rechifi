export default eventHandler(async (event) => {

    let products = await useDrizzle().query.products.findMany()

    return products
})