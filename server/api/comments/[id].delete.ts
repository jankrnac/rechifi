import { deleteComment } from '~/utils/abilities'

export default eventHandler(async (event) => {

    const id = getRouterParam(event, 'id')

    const comment = await useDrizzle().query.comments.findFirst({
        where: eq(tables.comments.id, id)
    })

    await authorize(deleteComment, comment)

    await useDrizzle().delete(tables.comments).where(eq(tables.comments.id, id))

})