export default eventHandler(async (event) => {

    let articles = await useDrizzle().query.posts.findMany({
        
    })

    return articles
})