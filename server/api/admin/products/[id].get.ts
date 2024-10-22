export default eventHandler(async (event) => {

    const id = getRouterParam(event, 'id')

    let product = await useDrizzle().query.products.findFirst({
        where: eq(tables.posts.id, id),
    })

    return product
})