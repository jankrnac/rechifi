<template>

    <div class="flex flex-col flex-grow justify-center items-center">

        <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-24">
            <span class="font-bold">Add </span> 
            <span class="font-playfair">new</span>
        </h1>

        <div class="flex gap-12">
            <nuxt-link to="/blog/new" class="flex flex-col items-center gap-5 border rounded-xl px-12 py-6 hover:border-gray-400 transition-all hover:text-blue-800">
                <UIcon name="i-ph-newspaper-duotone" size="90px" />
                <div class="text-4xl font-light">Article</div>
            </nuxt-link>
            <nuxt-link to="/reviews/new" class="flex flex-col items-center gap-5 border rounded-xl px-12 py-6 hover:border-gray-400 transition-all hover:text-green-800">
                <UIcon name="i-ph-star-half-duotone" size="90px" />
                <div class="text-4xl font-light">Review</div>
            </nuxt-link>
        </div>

    </div>
</template>


<script setup>


definePageMeta({
    middleware: 'auth'
});

</script>