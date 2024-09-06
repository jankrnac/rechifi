import bcryptjs from "bcryptjs"

export default eventHandler(async (event) => {
    
    const body = await readBody(event)

    let user = await useDrizzle().query.users.findFirst({
        where: eq(tables.users.email, body.email),
        with: {
            avatar: true
        }
    })

    if (!user)
    {
        return createError({
            statusCode: 401,
            statusMessage: "Account not found",
        }); 
    }

    const check = await bcryptjs.compare(body.password, user!.password) // Check password

    if (!check)
    {
        return createError({
            statusCode: 401,
            statusMessage: "Invalid username or password",
        }); 
    }
        
    const userData = { 
        id: user?.id,
        username: user?.username,
        email: user?.email,
        avatar: user?.avatar
    }

    await setUserSession(event, {
        user: userData,
    })


    return user
})