export default eventHandler(async (event) => {

    const body = await readBody(event)

    const like = await useDrizzle().insert(tables.likes).values(body).returning().get()
    
    return like
})