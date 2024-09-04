export default eventHandler(async (event) => 
{

    const id = getRouterParam(event, 'id')


    let posts = await useDrizzle().query.reviews.findMany({
        where: eq(tables.posts.userId, id),
        with: { 
            user: true,
            cover: true
        }
    })

    return posts
    
})