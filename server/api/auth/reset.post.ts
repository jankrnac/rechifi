import bcryptjs from "bcryptjs";

export default eventHandler(async (event) => {
        
    const body = await readBody(event)

    const token = await $fetch('/api/tokens/' + body.token)

    let user = await useDrizzle().query.users.findFirst({
        where: eq(tables.users.id, token.userId),
    })
    
    const hashedPassword = await bcryptjs.hash(body.password, 10)
    
    await useDrizzle().update(tables.users).set({
        password: hashedPassword
    }).where(eq(tables.users.id, user.id))
    
    await setUserSession(event, {
        user: user,
    })

    return 1

})