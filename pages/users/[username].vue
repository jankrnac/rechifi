<template>

<div class="flex flex-col gap-12 mt-12 w-full max-w-app">
    <div class="flex flex-col items-center">
        <div><IconsUser class="w-24 h-24 mb-8" /></div>
        <h1 class="font-bold text-5xl ">{{ profile.username }}</h1>
    </div>
    <h2 class="font-bold text-2xl">Current setup</h2>

    <h2 class="font-bold text-2xl">Reviews</h2>
</div>

</template>

<script setup>

const user = useSupabaseUser()
const client = useSupabaseClient()

const { data:profile } = await useFetch('/api/users/' + user.value.id)


</script>