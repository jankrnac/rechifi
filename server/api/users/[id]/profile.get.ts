export default eventHandler(async (event) => 
    {
    
        const id = getRouterParam(event, 'id')
    
        let posts = await useDrizzle().query.users.findFirst({
            where: or(
                eq(tables.users.email, id),
                eq(tables.users.username, id),
            ),
            with: { 
                posts: {
                    with: {
                        user: true,
                        cover: true
                    }
                },
            }
        })
    
        return posts
        
    })