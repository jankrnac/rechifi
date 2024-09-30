export default eventHandler(async (event) => {
    await requireUserSession(event)

    const body = await readBody(event)

    const element = await useDrizzle().insert(tables.elements).values(body).returning().get()
    
    return element
})