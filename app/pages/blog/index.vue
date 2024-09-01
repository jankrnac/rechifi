<template>

<div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-6">
        <span class="font-bold">News & </span> 
        <span class="font-playfair">articles</span>
    </h1>

    <Wave />

    <ul class="flex gap-4 my-6 lg:my-12">
        <div class="rounded-xl bg-yellow-200 px-5 py-2 font-semibold cursor-pointer hover:bg-yellow-300 transition" @click="activeFilters = ['IEM', 'DAP','DAC']">All</div>
        <div class="border-r m-1"></div>
        <div class="rounded-xl bg-blue-200 px-5 py-2 font-semibold cursor-pointer hover:bg-blue-300 transition" :class="[ activeFilters.includes('IEM') ? 'opacity-100' : 'opacity-30']" @click="activeFilters = ['IEM']">IEM</div>
        <div class="rounded-xl bg-green-200 px-5 py-2 font-semibold cursor-pointer hover:bg-green-300 transition" :class="[ activeFilters.includes('DAP') ? 'opacity-100' : 'opacity-30']" @click="activeFilters = ['DAP']">DAP</div>
        <div class="rounded-xl bg-red-200 px-5 py-2 font-semibold cursor-pointer hover:bg-red-300 transition" :class="[ activeFilters.includes('DAC') ? 'opacity-100' : 'opacity-30']" @click="activeFilters = ['DAC']">DAC</div>
    </ul>

    <div class="mx-auto mb-24 mt-6 lg:mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">

        <template v-for="post in posts" :key="post._path">
            <ArticleBox :post="post" />
        </template>

    </div>

</div>

</template>

<script setup lang="ts">
  
  useSeoMeta({
    title: 'Blog - Rechifi',
    description: `Stay in tune with the latest news and reviews on Chinese audio. 
    Explore our articles list, product comparisons, and expert recommendations. Uncover the best in audio innovation as we guide you through the world of 
    premium sound experiences from top Chinese brands. Elevate your audio journey with our curated knowledge hub. Dive into the articles now!`
})

const activeFilters = ref(['IEM','DAP','DAC'])

const { data:posts } =  await useAsyncData('articles', () => $fetch('/api/articles'),
{ 
    watch:[activeFilters]
})
  
</script>