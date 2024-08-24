export default eventHandler(async (event) => {

    const body = await readBody(event)

    const review = await useDrizzle().insert(tables.reviews).values({
        slug: body.slug,
        brand: body.brandPayload,
        model: body.modelPayload,
        type: body.type.value,
        product_title: body.productTitle,
        profile_id: body.user.value.id
    }).returning().get()
    
    return review
})