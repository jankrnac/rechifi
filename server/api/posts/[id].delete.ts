export default eventHandler(async (event) => {
    await requireUserSession(event)

    const id = getRouterParam(event, 'id')

    await useDrizzle().delete(tables.posts).where(eq(tables.posts.id, id))

})