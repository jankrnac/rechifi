import bcryptjs from "bcryptjs";

export default eventHandler(async (event) => {
        
    const body = await readBody(event)

    const hashedPassword = await bcryptjs.hash(body.password, 10); // Hash password

    var rand = function() {
        return Math.random().toString(36).slice(2); // remove `0.`
    };
    
    var token = rand() + rand()

    const user = await useDrizzle().insert(tables.users).values({
        email: body.email,
        password: hashedPassword,
        username: body.email,

    }).returning().get()

    const activationToken = await useDrizzle().insert(tables.tokens).values({
        userId: user.id,
        value: token
    }).returning().get()
        
    return {
        user: user,
        token: activationToken
    }

})