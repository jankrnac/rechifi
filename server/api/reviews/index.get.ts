export default eventHandler(async (event) => {

    let articles = await $fetch('/api/posts', {
        query: {
            type: 'review'
        }
    })

    return articles
})