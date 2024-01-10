<template>

    <div class="flex flex-col items-center">
        <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-6">
            <span class="font-bold">Announced & </span> 
            <span class="font-playfair">Upcoming</span>
        </h1>
    
        <Wave />
    
        <ul class="divide-y divide-gray-100 w-full max-w-app">
    
            <template v-for="upcoming in upcomings" :key="upcoming._path">
                <UpcomingBox :upcoming="upcoming" />
            </template>
    
        </ul>
    
    </div>
    
</template>
    
<script setup lang="ts">


      const upcomings = await queryContent('/iems')
      
        .sort({ releaseDate: 1 }) // show latest articles first
      
        .where({ _partial: false }) // exclude the Partial files

        .where({ released: false })
      
        .find()
        
      
</script>