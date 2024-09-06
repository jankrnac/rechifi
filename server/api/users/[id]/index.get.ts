export default eventHandler(async (event) => 
{
    const id = getRouterParam(event, 'id')

    let posts = await useDrizzle().query.users.findFirst({
        where: eq(tables.users.id, id),
        with: { 
            posts: {
                with: {
                    user: true
                }
            },
            avatar: true
        }
    })

    return posts
    
})