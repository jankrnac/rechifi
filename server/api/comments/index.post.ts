export default eventHandler(async (event) => {

    await requireUserSession(event)

    const body = await readBody(event)

    const comment = await useDrizzle().insert(tables.comments).values(body).returning().get()
    
    return comment
})