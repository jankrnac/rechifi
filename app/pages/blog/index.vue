<template>

<div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-6">
        <span class="font-bold">News & </span> 
        <span class="font-playfair">articles</span>
    </h1>

    <Wave />

    <ul class="flex gap-4 my-6 lg:my-12 select-none">

        <div class="rounded-xl bg-blue-200 dark:bg-blue-600 px-5 py-2 font-semibold cursor-pointer hover:bg-blue-300 transition" 
            :class="[ activeFilters.includes('iem') ? 'opacity-100' : 'opacity-30']" 
            @click="toggleFilter('iem')"
        >
            IEM
        </div>

        <div class="rounded-xl bg-green-200 dark:bg-green-600 px-5 py-2 font-semibold cursor-pointer hover:bg-green-300 transition" 
            :class="[ activeFilters.includes('dap') ? 'opacity-100' : 'opacity-30']" 
            @click="toggleFilter('dap')"
        >
        DAP
    </div>

        <div class="rounded-xl bg-red-200 dark:bg-red-500 px-5 py-2 font-semibold cursor-pointer hover:bg-red-300 transition" 
            :class="[ activeFilters.includes('dac') ? 'opacity-100' : 'opacity-30']" 
            @click="toggleFilter('dac')"
        >
        DAC
        </div>
    </ul>

    <template v-if="posts.length">

        <div class="mx-auto mb-24 mt-6 lg:mt-16 grid max-w-app w-full grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">

            <template v-for="post in posts" :key="post._path">
                <ArticleBox :post="post" />
            </template>

        </div>

    </template>

    <template v-else>
        <div class="text-2xl mt-10 font-light">
            No articles found
        </div>
    </template>

</div>

</template>

<script setup lang="ts">

  useSeoMeta({
    title: 'News nad articles',
    description: `Articles created by users about everything that is happening in chifi world.`
})



const activeFilters = ref(['iem','dap','dac'])

const toggleFilter = (value) => {
    if (activeFilters.value.includes(value))
    {
        activeFilters.value.splice(activeFilters.value.findIndex(e=>e==value),1)
    }
    else
    {
        activeFilters.value.push(value)
    }
}

const { data:posts, refresh } =  await useFetch('/api/posts', {
    query: {
        type: 'article',
        gearType: activeFilters.value
    }
})
  
</script>