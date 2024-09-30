import bcryptjs from "bcryptjs"

export default eventHandler(async (event) => {
    
    const body = await readBody(event)

    let user = await useDrizzle().query.users.findFirst({
        where: eq(tables.users.email, body.email),
        with: {
            avatar: true,
            token: true
        }
    })
    

    if (!user)
    {
        return createError({
            statusCode: 401,
            statusMessage: "Account not found",
        }); 
    }
    else if (!user.activated && !user.token)
    {
        return createError({
            statusCode: 404,
            statusMessage: "Something went wrong",
        }); 
        
    }
    else if (user.token && !user.token.activatedAt)
    {
        return createError({
            statusCode: 404,
            statusMessage: "Account not activated",
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