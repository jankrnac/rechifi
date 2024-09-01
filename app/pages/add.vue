<template>

    <div class="flex flex-col flex-grow justify-center items-center">

        <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-24">
            <span class="font-bold">Add </span> 
            <span class="font-playfair">new</span>
        </h1>

        <div class="flex gap-12">
            <nuxt-link to="/blog/new" class="font-light flex flex-col items-center gap-5 border rounded-xl px-20 py-12 hover:border-blue-400 transition-all hover:text-blue-800 hover:font-bold">
                <UIcon name="i-ph-newspaper-duotone" size="90px" />
                <div class="text-4xl w-32 text-center">Article</div>
            </nuxt-link>
            <nuxt-link to="/reviews/new" class="font-light flex flex-col items-center gap-5 border rounded-xl px-20 py-12 hover:border-green-400 transition-all hover:text-green-800 hover:font-bold">
                <UIcon name="i-ph-star-half-duotone" size="90px" />
                <div class="text-4xl w-36 text-center">Review</div>
            </nuxt-link>
        </div>

    </div>
</template>


<script setup>


definePageMeta({
    middleware: 'auth'
});

</script>