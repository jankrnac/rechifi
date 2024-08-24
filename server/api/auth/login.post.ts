import bcrypt from "bcrypt"

export default eventHandler(async (event) => {
    
    const body = await readBody(event)

    let user = await useDrizzle().query.users.findFirst({
        where: eq(tables.users.email, body.email)
    })

    const check = await bcrypt.compare(body.password, user!.password) // Check password

    if (!check)
    {
        return createError({
            statusCode: 401,
            statusMessage: "Invalid username or password",
        }); 
    }
        
    const userData = { 
        id: user?.id,
        username: user?.username 
    }

    await setUserSession(event, {
        user: userData,
    })


    return user
})