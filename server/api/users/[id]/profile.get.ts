export default eventHandler(async (event) => 
    {
    
        const id = getRouterParam(event, 'id')
    
        let user = await useDrizzle().query.users.findFirst({
            where: or(
                eq(tables.users.email, id),
                eq(tables.users.username, id),
            ),
            with: { 
                avatar: true,
                posts: {
                    with: {
                        user: true,
                        cover: true,
                        likes: true,
                        product: true
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