<template>

<div class="flex flex-col flex-1">
    <div v-if="review.profile_id == user.id" class="border-y p-5 mb-2">

        <div class="max-w-app mx-auto flex">
            <nuxt-link :to="useRoute().fullPath + '/edit'" class="bg-blue-200 rounded px-4 py-2.5 text-sm flex items-center">
                <IconsEdit class="w-4 h-4 mr-2"/>
                Edit
            </nuxt-link>
        </div>
    </div>

    <div class="w-full max-w-app mx-auto">

        <Layout @change="updatePage" :elements="review.elements" />

    </div>

</div>

</template>

<script setup>

    const route = useRoute()
    const user = useSupabaseUser()

    const { data:review } = await useFetch('/api/reviews/layout', {
        method: "POST",
        body: {
            username: route.params.username,
            brand: route.params.brand,
            model: route.params.model,
        }
    })

</script>