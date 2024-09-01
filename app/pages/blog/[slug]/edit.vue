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