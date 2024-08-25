<template>

<div class="max-w-app w-full mx-auto pb-24">

    <div v-show="editable" class="flex items-center gap-5 fixed left-0 z-[999]">
        <ElementsAvailable />
    </div>




    <Layout @change="updatePage" :elements="review.elements" :editable="editable" />

</div>
</template>


<script setup>

definePageMeta({
    middleware: ['auth', 'owner'],
});

const route = useRoute()
const client = useSupabaseClient()

const editable = ref(true)

const user = useSupabaseUser()

const { data:profile } = useFetch('/api/users/' + user.value.id)

// Get the review with shole layout
const { data:review } = await useFetch('/api/reviews/layout', {
    method: "POST",
    body: {
        username: route.params.username,
        brand: route.params.brand,
        model: route.params.model,
    }
})

// Extract sections elements for navigation (in Header element)
const nav = review.value.elements.filter(e => e.type == 'section')
provide('nav',nav)

const activeElements = [...review.value.elements]

const updatePage = async (data) => {
    console.log(data)
    review.value.elements = data
}

const saving = ref(false)

// After the click on save button, only then we will update DB
const save = async () => {
    saving.value = true
    for (let [index, element] of review.value.elements.entries()) {

        // Newly added element  
        if (!Number.isInteger(element.id) && element.id.includes('new'))
        {
            await client.from('elements').insert({
                data: element.data,
                type: element.type,
                review_id: review.value.id,
                order: index
            })
        }

        // Existing element
        if (Number.isInteger(element.id))
        {
            // is not image
            if (!(element.type in ['image','images']))
            {
                await client.from('elements').update({
                    data: element.data,
                    order: index
                }).eq('id', element.id)
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
                const { data:cdnFilename } = await useFetch(`/api/files/${profile.value.username}`, {
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
    if(review.value.elements.length > 0)
    {
        activeElements.forEach(async (item) => {
            if(!review.value.elements.map(e => e.id).includes(item.id))
            {
                await client.from('elements').delete().eq('id', item.id)
            }
        })
    }
    else
    {
        activeElements.forEach(async (item) => {
            const element = await Element.findOrFail(item.id)
            await element.delete()
        })
    }

    // Last save the review
    if (review.value.uploadNeeded)
    {
        const { data:cdnFilename } = await useFetch(`/api/files/${profile.value.username}`, {
            method: 'POST',
            body: review.value.upload
        })

        review.value.cover = cdnFilename

        await client.from('reviews').update({
            cover: review.value.cover,
        }).eq('id', review.value.id)

        review.value.uploadNeeded = false
    }

    await client.from('reviews').update({
        title: review.value.title,
        description: review.value.description
    }).eq('id', review.value.id)


    saving.value = false
}

provide('date', review.value.created_at)


const settingsVisible = ref(false)

const coverChanged = (data) => {
    console.log(data.blob)
    review.value.cover = data.blob
    review.value.upload  = data.form
    review.value.uploadNeeded = true
}

</script>