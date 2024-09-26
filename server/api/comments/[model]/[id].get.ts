import { inArray, desc, isNull } from 'drizzle-orm';

export default eventHandler(async (event) => {

    const model = getRouterParam(event, 'model')
    const id = getRouterParam(event, 'id')

    let comments = await useDrizzle().query.comments.findMany({
        where: eq(tables.comments.postId, id),
        with: {
            user: true,
            likes: true
        },
        orderBy: [desc(tables.comments.id)],
    })

    return comments
})