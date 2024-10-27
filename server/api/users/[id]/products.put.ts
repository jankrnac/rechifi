export default eventHandler(async (event) => 
{

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    const activeProdcuts = await useDrizzle().query.usersToProducts.findMany({
        where: eq(tables.usersToProducts.userId, id)
    })


    let deleted = activeProdcuts.map(e=>e.productId).filter(x => !body.products.map(f=>f.id).includes(x))

    for (const product of deleted)
    {
        await useDrizzle().delete(tables.usersToProducts).where((
            eq(tables.usersToProducts.productId, product)
        ))    
    }

    let added = body.products.map(f=>f.id).filter(x => !activeProdcuts.map(f=>f.id).includes(x))

    for (const product of added)
    {
        await useDrizzle().insert(tables.usersToProducts).values({
            productId: product,
            userId: id
        })
    }

    return 1
    
})