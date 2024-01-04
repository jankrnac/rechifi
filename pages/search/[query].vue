<template>

<div class="flex flex-col items-center justify-center max-w-app">

    <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-16">
        <span class="font-bold">Search: </span> 
        <span class="font-playfair">{{route.params.query}}</span>
    </h1>

    <div v-if="posts.length">
        <h2 class="text-2xl">Articles: <small class="text-gray-500">{{ posts.length }} found</small></h2>
        
        <div class="grid grid-cols-4 gap-5">

            <template v-for="post in posts" :key="post._path">
                    <BlogPostBox :post="post" />
            </template>
        </div>
    </div>

    <div v-if="headphones.length">
        <h2 class="text-2xl">Headphones: <small class="text-gray-500">{{ headphones.length }} found</small></h2>
        <ul class="mx-auto lg:mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">

            <template v-for="headphone in headphones" :key="headphone._path">
                    <ProductBox :product="headphone" />
            </template>
            
        </ul>
    </div>

</div>
</template>

<script setup lang="ts">
    
    const route = useRoute()
    
    const posts = await queryContent('blog').where({ 'title': { $icontains: route.params.query } }).find()
    const headphones = await queryContent('iems').where({ 'title': { $icontains: route.params.query } }).find()

</script>