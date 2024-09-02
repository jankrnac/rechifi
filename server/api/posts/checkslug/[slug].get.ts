import { eq } from 'drizzle-orm';

export default eventHandler(async (event) => {

    const slug = getRouterParam(event, 'slug')

    let posts = await useDrizzle().query.posts.findMany({
        where: eq(tables.posts.slug, slug)
    })

    return posts
})