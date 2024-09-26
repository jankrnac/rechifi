export const useLayout = () => {

    const save = async (post: Ref, activeElements) => {


        for (let [index, element] of post.value.elements.entries()) 
        {

            // Newly added element  
            if (element.new)
            {
                const result = await $fetch('/api/elements', {
                    method: "POST",
                    body: {
                        data: element.data,
                        type: element.type,
                        postId: post.value.id,
                        order: index
                    }
                })

                element.id = result.id
            }

            // Existing element
            if (!element.new)
            {
                // is not image
                if (!(element.type in ['image','images']))
                {
                    await $fetch('/api/elements/' + element.id, {
                        method: "PUT",
                        body: {
                            data: element.data,
                            order: index
                        }
                    })
                }
            }

            // Upload Single
            if(element.uploadNeeded)
            {
                // upload the file
                const uploadResult = await $fetch('/api/files/blob', {
                    method: 'POST',
                    body: element.upload,
                })

                // Save the file to DB
                const file = await $fetch('/api/files/', {
                    method: "POST",
                    body: {
                        filename: uploadResult[0].pathname,
                    }
                })

                // Delete the old image if not placeholder
                if (element.oldImage != 'placeholder.webp')
                {
                    await $fetch('/api/files/blob/' + element.oldImage, {
                        method: "DELETE"
                    })
                }

                // Change the name
                element.data.image = uploadResult[0].pathname
                element.uploadNeeded = false

        
                // Update our DB with
                await $fetch('/api/elements/' + element.id, {
                    method: "PUT",
                    body: {
                        data: element.data,
                        order: index
                    }
                })
            }


            // Upload Multi
            if(element.uploads)
            {

                // Upload the file and get the name from CDN
                const uploadResult = await $fetch(`/api/files/blob`, {
                    method: 'POST',
                    body: element.uploads
                })

                // Change the name
                element.data.images = uploadResult.map(e => e.pathname)
                
                // Update our DB with
                await $fetch('/api/elements/' + element.id, {
                    method: "PUT",
                    body: {
                        data: element.data,
                        order: index
                    }
                })

            }
        }


        // Deleting elements
        if(post.value.elements.length > 0)
        {
            activeElements.forEach(async (item) => {

                if(!post.value.elements.map(e => e.id).includes(item.id))
                {

                    await $fetch('/api/elements/' + item.id, {
                        method: "DELETE",
                    })
                }
            })
        }
        else
        {
            activeElements.forEach(async (item) => {
                await $fetch('/api/elements/' + item.id, {
                    method: "DELETE",
                })
            })
        }


        // Last save the review
        if (post.value.uploadNeeded)
        {
            // upload the file
            const uploadResult = await $fetch('/api/files/blob', {
                method: 'POST',
                body: post.value.upload,
            })

            // Save the file to DB
            const file = await $fetch('/api/files/', {
                method: "POST",
                body: {
                    filename: uploadResult[0].pathname,
                }
            })

            // Attach the coverId to post
            await $fetch('/api/posts/' + post.value.id, {
                method: "PATCH",
                body: {
                    coverId: file.id,
                }
            })

            post.value.coverId = file.id

        }

        // Save the post itself
        await $fetch('/api/posts/' + post.value.id, {
            method: "PUT",
            body: post.value
        })
    }

    return {
        save
    }

}