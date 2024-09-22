export default eventHandler(async (event) => {

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    await useDrizzle().update(tables.posts).set({
        title: body.title,
        slug: body.slug,
        description: body.description,
        gearType: body.gearType,
        published: body.published
    }).where(eq(tables.posts.id, id))



})