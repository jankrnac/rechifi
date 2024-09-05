export const useLayout = () => {

    const save = async (post: Object, data  ) => {

        const activeElements = [...post.value.elements]

        for (let [index, element] of post.value.elements.entries()) 
        {

            // Newly added element  
            if (!Number.isInteger(element.id) && element.id.includes('new'))
            {
                await $fetch('/api/elements', {
                    method: "POST",
                    body: {
                        data: element.data,
                        type: element.type,
                        postId: post.value.id,
                        order: index
                    }
                })
            }

            // Existing element
            if (Number.isInteger(element.id))
            {
                // is not image
                if (!(element.type in ['image','images']))
                {
                    await  $fetch('/api/elements/' + element.id, {
                        method: "PUT",
                        body: {
                            data: element.data,
                            order: index
                        }
                    })
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


        // Last save the review
        if (data.uploadNeeded)
        {
            // upload the file
            const uploadResult = await $fetch('/api/files/blob', {
                method: 'POST',
                body: data.upload,
            })

            // Save the file to DB
            const file = await $fetch('/api/files/', {
                method: "POST",
                body: {
                    filename: uploadResult[0].pathname,
                }
            })

            console.log(file)
            // Attach the coverId to post
            await $fetch('/api/posts/' + article.value.id, {
                method: "PATCH",
                body: {
                    coverId: file.id,
                }
            })

            article.value.coverId = file.id

        }

        // Save the post itself
        await $fetch('/api/posts/' + post.value.id, {
            method: "PUT",
            body: data
        })
    }

    return {
        save
    }

}