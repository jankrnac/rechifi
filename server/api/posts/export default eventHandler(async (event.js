export default eventHandler(async (event) => {

    const id = getRouterParam(event, 'id')
    const body = await readFormData(event)

    const post = await useDrizzle().query.posts.findFirst({
        where: eq(tables.posts.id, id),
        with: {
            elements: true
        }
    })

    const activeElements = [...post.elements]

    
    for (let [index, element] of body.elements.entries()) {

        // Newly added element  
        if (!Number.isInteger(element.id) && element.id.includes('new'))
        {
           await useDrizzle().insert(tables.elements).values({
                data: element.data,
                type: element.type,
                postId: post?.id,
                order: index
            })
        
        }

        // Existing element
        if (Number.isInteger(element.id))
        {
            // is not image
            if (!(element.type in ['image','images']))
            {
                await useDrizzle().update(tables.elements).set({
                    data: element.data,
                    order: index
                }).where(eq(tables.elements.id, element.id))
            }
        }

        // Upload Single
        if(element.data.uploadNeeded)
        {
            // Uploade the file and get the name from CDN
            const { data:cdnFilename } = await useFetch(`/api/files/${profile.value.username}`, {
                method: 'POST',
                body: element.data.upload
            })

            // Change the name
            element.data.image = cdnFilename.value
            element.data.uploadNeeded = false

            // Update our DB with
            await client.from('elements').update({
                data: element.data,
            }).eq('id', element.id)
        }

        
        // Upload Multi
        if(element.data.uploads && element.data.uploads.length)
        {
            for (const upload of element.data.uploads) 
            {
                // Uploade the file and get the name from CDN
                const { data:cdnFilename } = await $fetch(`/api/files/blob`, {
                    method: 'POST',
                    body: Object.values(upload)[0]
                })

                // Change the name
                element.data.images[Object.keys(upload)[0]] = cdnFilename.value
            }

            // Update our DB with
            await client.from('elements').update({
                data: element.data
            }).eq('id', element.id)
   
        }

    }

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