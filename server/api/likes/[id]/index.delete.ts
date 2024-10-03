export default eventHandler(async (event) => {

    const id = getRouterParam(event, 'id')

    await useDrizzle().delete(tables.likes).where((
        eq(tables.likes.id, id)
    ))

})