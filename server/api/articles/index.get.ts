export default eventHandler(async (event) => {

    let articles = await $fetch('/api/posts', {
        query: {
            type: 'article'
        }
    })

    return articles
})