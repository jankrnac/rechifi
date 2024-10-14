<template>

<div class="w-full flex flex-col gap-y-16 items-center justify-center max-w-app mb-24">

    <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-16">
        <span class="font-bold">Search: </span> 
        <span class="font-playfair">{{route.params.query}}</span>
    </h1>

    <div v-if="posts.length" class="w-full">
        <h2 class="text-2xl font-bold mb-10">Articles: <small class="text-gray-500 font-thin">{{ posts.length }} found</small></h2>
        
        <div class="mx-auto lg:mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">

            <template v-for="post in posts">
                    <ArticleBox :post="post" />
            </template>
        </div>
    </div>

    <div v-if="iems.length" class="w-full">
        <h2 class="text-2xl font-bold mb-10">IEMs: <small class="text-gray-500 font-thin">{{ iems.length }} found</small></h2>
        <ul class="grid grid-cols-2 gap-x-4 gap-y-2 md:gap-y-6 sm:grid-cols-3 sm:gap-x-2 lg:grid-cols-4 xl:gap-x-4">

            <template v-for="headphone in iems" :key="headphone._path">
                    <ProductBox :product="headphone" />
            </template>
            
        </ul>
    </div>

    <div v-if="daps.length" class="w-full">
        <h2 class="text-2xl font-bold mb-10">DAPs: <small class="text-gray-500 font-thin">{{ daps.length }} found</small></h2>
        <ul class="grid grid-cols-2 gap-x-4 gap-y-2 md:gap-y-6 sm:grid-cols-3 sm:gap-x-2 lg:grid-cols-4 xl:gap-x-4">

            <template v-for="dap in daps" :key="dap._path">
                    <ProductBox :product="dap" />
            </template>
            
        </ul>
    </div>

    <div v-if="dacs.length" class="w-full">
        <h2 class="text-2xl font-bold mb-10">DAPs: <small class="text-gray-500 font-thin">{{ dacs.length }} found</small></h2>
        <ul class="grid grid-cols-2 gap-x-4 gap-y-2 md:gap-y-6 sm:grid-cols-3 sm:gap-x-2 lg:grid-cols-4 xl:gap-x-4">

            <template v-for="dac in dacs" :key="dac._path">
                    <ProductBox :product="dac" />
            </template>
            
        </ul>
    </div>
</div>
</template>

<script setup lang="ts">

    useSeoMeta({
        title: 'Search',
    })

    const route = useRoute()
    
    const { data:posts } = await useFetch('/api/posts/search/' +  route.params.query)
    const iems = await queryContent('iems').where({ $or: [
        { 'title': { $icontains: route.params.query }},
        { 'brand': { $icontains: route.params.query }},
        { 'model': { $icontains: route.params.query }}

    ]}).find()
    const daps = await queryContent('daps').where({ $or: [
        { 'title': { $icontains: route.params.query }},
        { 'brand': { $icontains: route.params.query }},
        { 'model': { $icontains: route.params.query }}

    ]}).find()
    const dacs = await queryContent('dacs').where({ $or: [
        { 'title': { $icontains: route.params.query }},
        { 'brand': { $icontains: route.params.query }},
        { 'model': { $icontains: route.params.query }}

    ]}).find()
</script>