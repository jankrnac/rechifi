import {  inArray, desc, isNull } from 'drizzle-orm';

export default eventHandler(async (event) => {

    const brand = getRouterParam(event, 'brand')
    const model = getRouterParam(event, 'model')

    const slug = brand + "/" + model
    
    let product = await useDrizzle().query.products.findFirst({
        where: eq(tables.products.slug, slug),
        with: {
            posts: true,
            likes: true
        }
    })

    return product
})