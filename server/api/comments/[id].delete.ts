export default eventHandler(async (event) => {

    const id = getRouterParam(event, 'id')

    await useDrizzle().delete(tables.comments).where(eq(tables.comments.id, id))

})