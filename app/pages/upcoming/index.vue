<template>

    <div class="flex flex-col items-center">
        <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-6">
            <span class="font-bold">Announced & </span> 
            <span class="font-playfair">Upcoming</span>
        </h1>
    
        <Wave />
    
        <ul v-if="upcomings.length" class="divide-y divide-gray-100 w-full max-w-app">
    
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
    title: 'Upcoming - Rechifi',
    description: `Get a sneak peek into the future of audio excellence with our upcoming chi-fi audio devices. Stay ahead of the curve as we unveil the latest innovations, designs, 
    and cutting-edge technology in the world of sound. Explore our curated collection of upcoming products, 
    where anticipation meets superior sound. Be the first to experience the next wave of audio brilliance stay tuned for exclusive insights and previews on Rechifi.`
})


      const upcomings = await queryContent('/')
      
        .sort({ releaseDate: 1 }) // show latest articles first
      
        .where({ _partial: false }) // exclude the Partial files

        .where({ upcoming: true })
      
        .find()
        
      
</script>