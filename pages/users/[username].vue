<template>

<div class="flex flex-col gap-12 mt-12 w-full max-w-app">
    <div class="flex flex-col items-center">
        <div><IconsUser class="w-24 h-24 mb-8" /></div>
        <h1 class="font-bold text-5xl ">{{ profile.username }}</h1>
    </div>
    <h2 class="font-bold text-2xl">Current setup</h2>

    <h2 class="font-bold text-2xl">Reviews</h2>
    <div class="mx-auto lg:mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">
        
        <div v-for="review in reviews" class="relative">

            <ReviewBox :review="review" />

        </div>
    </div>
</div>

</template>

<script setup>

const client = useSupabaseClient()

const { data:profile } = await client.from('profiles').select('*').eq('username',useRoute().params.username).single()

const { data:reviews } = await useAsyncData(async () => {
    const { data } = await client.from('reviews').select('*, profiles(username)').eq('profile_id', profile.id).order('created_at')

    return data
})

</script>