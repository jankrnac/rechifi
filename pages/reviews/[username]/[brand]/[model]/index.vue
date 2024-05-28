<template>

<div class="flex-1">
  
    <div v-if="user && review.profile_id == user.id" class="border-y dark:border-gray-700 py-2 lg:p-5 mb-2">

        <div class="max-w-app mx-auto flex gap-2">
            <nuxt-link :to="'/reviews/' + review.profiles.username + '/' + review.brand + '/' + review.model + '/edit'" class="bg-blue-200 rounded px-4 py-2.5 text-sm flex items-center">
                <Icon name="ph:pencil-simple-thin" class="w-4 h-4 mr-2"/>
                Edit
            </nuxt-link>

            <button v-if="review.published" class="bg-red-200 rounded px-4 py-2.5 text-sm flex items-center" @click="publish(false)">
                <Icon name="ph:x-thin" class="w-4 h-4 mr-2"/>
                Unpublish
            </button>
            <button v-else class="bg-green-200 rounded px-4 py-2.5 text-sm flex items-center" @click="publish(true)">
                <Icon name="ph:upload-thin" class="w-4 h-4 mr-2"/>
                Publish
            </button>

        </div>
    </div>

    
    <div class="w-full max-w-app mx-auto mb-24">

        <Layout :elements="review.elements" />

        <LazyComments />

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
        ogTitle: review.value.title + ' - Rechifi',
        description: review.value.description,
        ogDescription: review.value.description,
        ogImage: review.value.cover,
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