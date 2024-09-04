export default eventHandler(async (event) => {



    // Deleting elements
    if(body.elements.length > 0)
    {
        activeElements.forEach(async (item) => {
            if(!post.elements.map(e => e.id).includes(item.id))
            {
                await useDrizzle().delete(tables.elements).where(eq(tables.elements.id, item.id))
            }
        })
    }
    else
    {
        activeElements.forEach(async (item) => {
            await useDrizzle().delete(tables.elements).where(eq(tables.elements.id, item.id))
        })
    }



    await useDrizzle().update(tables.posts).set({
        title: body.title,
        slug: body.slug,
        description: body.description,
    }).where(eq(tables.posts.id, id))



})