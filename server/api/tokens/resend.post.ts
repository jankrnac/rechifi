export default eventHandler(async (event) => {

    const body = await readBody(event)

    let user = await useDrizzle().query.users.findFirst({
        where: and(
            eq(tables.users.email, body.email),
        )
    })

    await useDrizzle().delete(tables.tokens).where(
        eq(tables.tokens.userId, user.id)
    )

    var rand = function() {
        return Math.random().toString(36).slice(2); // remove `0.`
    };
    
    var token = rand() + rand()

    const activationToken = await useDrizzle().insert(tables.tokens).values({
        userId: user.id,
        value: token
    }).returning().get()
        

    return activationToken
})