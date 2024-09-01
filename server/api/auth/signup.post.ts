import bcrypt from "bcrypt";

export default eventHandler(async (event) => {
        
    const body = await readBody(event)

    const hashedPassword = await bcrypt.hash(body.password, 10); // Hash password
    
    const user = await useDrizzle().insert(tables.users).values({
        email: body.email,
        password: hashedPassword,
        username: body.email
    }).returning().get()

    const userData = { 
        username: user.username 
    };
    
    await setUserSession(event, {
        user: userData,
    })
        
    return user

})