export default eventHandler(async (event) => {
    await requireUserSession(event)

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (body.type == 'product')
    {
        await useDrizzle().delete(tables.heroes).where(eq(tables.heroes.id, id))

    }

})