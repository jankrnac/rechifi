import { eq } from 'drizzle-orm';

export default eventHandler(async (event) => {

    const username = getRouterParam(event, 'username')

    let users = await useDrizzle().query.users.findMany({
        where: eq(tables.users.username, username)
    })

    return users
})