import bcryptjs from "bcryptjs";

export default eventHandler(async (event) => {
        
    const body = await readBody(event)

    const hashedPassword = await bcryptjs.hash(body.password, 10); // Hash password
    
    const user = await useDrizzle().insert(tables.users).values({
        email: body.email,
        password: hashedPassword,
        username: body.email
    }).returning().get()

    const userData = {
        id: user?.id,
        username: user.username,
        email: user.email
    };
    
    await setUserSession(event, {
        user: userData,
    })
        
    return user

})