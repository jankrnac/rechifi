<template>

<div class="flex flex-col flex-1">
  
    <div v-if="user && review.profile_id == user.id" class="border-y p-5 mb-2">

        <div class="max-w-app mx-auto flex gap-2">
            <nuxt-link :to="'/reviews/' + review.profiles.username + '/' + review.brand + '/' + review.model + '/edit'" class="bg-blue-200 rounded px-4 py-2.5 text-sm flex items-center">
                <IconsEdit class="w-4 h-4 mr-2"/>
                Edit
            </nuxt-link>

            <button v-if="review.published" class="bg-red-200 rounded px-4 py-2.5 text-sm flex items-center" @click="publish(false)">
                <IconsCross class="w-4 h-4 mr-2"/>
                Unpublish
            </button>
            <button v-else class="bg-green-200 rounded px-4 py-2.5 text-sm flex items-center" @click="publish(true)">
                <IconsUpload class="w-4 h-4 mr-2"/>
                Publish
            </button>

        </div>
    </div>

    
    <div class="w-full max-w-app mx-auto">

        <Layout :elements="review.elements" />

    </div>

</div>

</template>

<script setup>

    const route = useRoute()
    const user = useSupabaseUser()
    const client = useSupabaseClient()

    const { data:review } = await useFetch('/api/reviews/layout', {
        method: "POST",
        body: {
            username: route.params.username,
            brand: route.params.brand,
            model: route.params.model,
        }
    })
    useSeoMeta
    ({
        title: review.value.title + ' - Rechifi',
        ogTitle: 'My Amazing Site',
        description: 'This is my amazing site, let me tell you all about it.',
        ogDescription: 'This is my amazing site, let me tell you all about it.',
        ogImage: 'https://example.com/image.png',
        twitterCard: 'summary_large_image',
    })

    // Extract sections elements for navigation (in Header element)
    const nav = review.value.elements.filter(e => e.type == 'section')
    provide('nav',nav)

    provide('date', review.value.created_at)

    
    const publish = async (value) => {
        const { error } = await client.from('reviews').update({'published': value}).eq('id', review.value.id)

        if(!error) review.value.published = value
        
    }
</script>