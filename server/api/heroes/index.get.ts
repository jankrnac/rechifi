import { asc } from 'drizzle-orm';

export default eventHandler(async (event) => {

    let heroes = await useDrizzle().query.heroes.findMany({
        with: {
            product: true
        },
        orderBy: [asc(tables.posts.id)],

    })

    return heroes
})