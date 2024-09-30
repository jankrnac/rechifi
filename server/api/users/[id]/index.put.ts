export default eventHandler(async (event) => {
    await requireUserSession(event)

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    await useDrizzle().update(tables.users).set(body).where(eq(tables.users.id, id))



})