<template>

    <div class="max-w-app w-full mx-auto pb-24">

        <div v-show="editable" class="flex items-center gap-5 fixed left-0 z-[999]">
            <ElementsAvailable />
        </div>

        <Settings 
            :post="article"
            :editable="editable"
            @save="save"
            @editableChanged="(data) => editable=data"
        />

        <Layout 
            :elements="article.elements" 
            :editable="editable" 
            @change="updateLayout"
        />

    </div>

</template>

<script setup>

    definePageMeta({
        middleware: ['auth', 'owner'],
    });

    const route = useRoute()

    const { data:article } = await useFetch(`/api/articles/${route.params.slug}`)

    const editable = ref(true)

    // update elements layout from Layout
    const updateLayout = async (data) => {
        console.log(data)
        article.value.elements = data
    }

    // master save from Settings
    const save = async (data) => {

        const activeElements = [...article.value.elements]

            
        for (let [index, element] of article.value.elements.entries()) 
        {

            // Newly added element  
            if (!Number.isInteger(element.id) && element.id.includes('new'))
            {
                await $fetch('/api/elements', {
                    method: "POST",
                    body: {
                        data: element.data,
                        type: element.type,
                        postId: article.value.id,
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
        await $fetch('/api/posts/' + article.value.id, {
            method: "PUT",
            body: data
        })
    }

    // Extract sections elements for navigation (in Header element)
    const nav = article.value.elements.filter(e => e.type == 'section')


    provide('nav',nav)
    provide('user', article.value.user)
    provide('date', article.value.createdAt)



</script>