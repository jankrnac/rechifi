export default eventHandler(async (event) => 
    {
    
        const id = getRouterParam(event, 'id')
    
        let user = await useDrizzle().query.users.findFirst({
            where: or(
                eq(tables.users.email, id),
                eq(tables.users.username, id),
            ),
            with: { 
                posts: {
                    with: {
                        user: true,
                        cover: true,
                        likes: true,
                    }
                },
                usersToProducts: {
                    with: {
                        product: true
                    }
                } 
            }
        })
    
        return user
        
    })