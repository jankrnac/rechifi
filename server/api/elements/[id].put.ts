export default eventHandler(async (event) => {
    await requireUserSession(event)

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    await useDrizzle().update(tables.elements).set(body).where(eq(tables.elements.id, id))

})