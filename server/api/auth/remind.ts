export default eventHandler(async (event) => {
        
    const body = await readBody(event)

    let user = await useDrizzle().query.users.findFirst({
        where: eq(tables.users.email, body.email),
    })
    
    if (!user)
    {
        return createError({
            statusCode: 401,
            statusMessage: "Account not found",
        }); 
    }

    var rand = function() {
        return Math.random().toString(36).slice(2)
    }
    
    var token = rand() + rand()

    const resetToken = await useDrizzle().insert(tables.tokens).values({
        userId: user.id,
        value: token,
        type: 'reset'
    }).returning().get()
        
    return {
        token: resetToken
    }

})