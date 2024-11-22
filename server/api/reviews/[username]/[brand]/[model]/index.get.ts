export default eventHandler(async (event) => {

    const username = getRouterParam(event, 'username')
    const brand = getRouterParam(event, 'brand')
    const model = getRouterParam(event, 'model')
    
    let user = await useDrizzle().query.users.findFirst({
        where: eq(tables.users.username, username),
    })

    let reviews = await useDrizzle().query.posts.findFirst({
        where: and(
            eq(tables.posts.type , 'review'),
            eq(tables.posts.userId , user.id),
            eq(tables.posts.productSlug , brand+'/'+model),
        ),
        with: {
            elements: true,
            likes: true
        }

    })

    return reviews
})