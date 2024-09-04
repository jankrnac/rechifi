export default eventHandler(async (event) => {

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    await useDrizzle().update(tables.users).set({
        username: body.username,
        name: body.name,
        avatarId: body.avatarId
    }).where(eq(tables.users.id, id))



})