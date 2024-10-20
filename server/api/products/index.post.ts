export default eventHandler(async (event) => {
    
    const session = await requireUserSession(event)

    const body = await readBody(event)
    
    const product = await useDrizzle().insert(tables.products).values(body).returning().get()

    return product
})