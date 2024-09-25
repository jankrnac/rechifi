export default eventHandler(async (event) => {

    const id = getRouterParam(event, 'id')

    await useDrizzle().delete(tables.elements).where(eq(tables.elements.id, id))

})