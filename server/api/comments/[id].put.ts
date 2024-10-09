import { editComment } from '~/utils/abilities'

export default eventHandler(async (event) => {

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    const comment = await useDrizzle().query.comments.findFirst({
        where: eq(tables.comments.id, id)
    })

    await authorize(editComment, comment)

    await useDrizzle().update(tables.comments).set(body).where(eq(tables.comments.id, id))

})