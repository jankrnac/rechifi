import { editPost } from '~/utils/abilities'

export default eventHandler(async (event) => {

    const session = await requireUserSession(event)

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)


    let post = await useDrizzle().query.posts.findFirst({
        where: eq(tables.posts.id, id)
    })

    await authorize(editPost, post)

    if(session.user.id != post!.userId)
    {
        return createError({
            statusCode: 403,
            statusMessage: "Not authorized",
        }); 
    }


    await useDrizzle().update(tables.posts).set({
        title: body.title,
        slug: body.slug,
        description: body.description,
        gearType: body.gearType,
        published: body.published
    }).where(eq(tables.posts.id, id))



})