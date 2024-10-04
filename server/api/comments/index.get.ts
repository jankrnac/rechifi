import { inArray, desc, isNull } from 'drizzle-orm';

export default eventHandler(async (event) => {

    const query = getQuery(event)

    let column = 'postId'
    if (query.postId) column = 'postId'
    else column = 'gear'

    let comments = await useDrizzle().query.comments.findMany({
        where: eq(tables.comments[column], query[column]),
        with: {
            user: {
                with: {
                    avatar: true
                }
            },
            likes: true
        },
        orderBy: [desc(tables.comments.id)],
    })

    return comments
})