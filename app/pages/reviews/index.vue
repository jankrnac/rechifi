<template>

    <div class="flex flex-col items-center justify-center">
        <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-6">
            <span class="font-bold">Reviews & </span> 
            <span class="font-playfair">ratings</span>
        </h1>
    
        <Wave />
        
        <template v-if="reviews && reviews.length">
        <div class="w-full mx-auto mt-6 mb-24 lg:mt-16 grid max-w-app grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">
            
            <template v-for="review in reviews">
                <ReviewBox :post="review" />
            </template>
    
        </div>
        </template>

        <template v-else>
        <div class="text-2xl mt-10 font-light">
            No reviews found
        </div>
    </template>

    
    </div>
    
    </template>
    
<script setup lang="ts">

useSeoMeta({
    title: 'Reviews - Rechifi',
    description: `Dive deep into the world of chi-fi perfection with our in-depth reviews. Uncover the nuances of sound, design, and innovation as we meticulously
     evaluate the latest audio headphones and devices from top Chinese brands. Make informed decisions with our expert insights, comparisons, and unbiased critiques.`
})



const { data:reviews } =  await useAsyncData('reviews', () => $fetch('/api/reviews'))

      
</script>