export default eventHandler(async (event) => {

    const body = await readBody(event)

    await useDrizzle().delete(tables.likes).where(and(
        body.userId ? eq(tables.likes.userId, body.userId) : eq(tables.likes.guestId, body.guestId),
        eq(tables.likes.commentId, body.commentId),

    ))

})