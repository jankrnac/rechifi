<template>

    <div class="flex flex-col items-center flex-1">
        <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-6">
            <span class="font-bold">New & </span> 
            <span class="font-playfair">Upcoming</span>
        </h1>
    
        <Wave />
    
        <ul v-if="upcomings.length" class="divide-y w-full max-w-[800px]">
    
            <template v-for="upcoming in upcomings" :key="upcoming._path">
                <UpcomingBox :upcoming="upcoming" />
            </template>
    
        </ul>

        <div v-else class="mt-12 text-2xl font-light">
            No upcoming gear right now.
        </div>
    
    </div>
    
</template>
    
<script setup lang="ts">

useSeoMeta({
    title: 'Upcoming',
    description: `Upcoming chifi gear information.`
})


    const { data:upcomings } = await useFetch('/api/products/upcoming')
      
        
      
</script>