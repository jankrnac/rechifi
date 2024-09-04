export default eventHandler(async (event) => {
    
    const session = await requireUserSession(event)

    const body = await readBody(event)

    body['userId'] = session.user!.id
    
    const article = await useDrizzle().insert(tables.posts).values(body).returning().get()


    return article
})