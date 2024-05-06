<template>

<div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-6">
        <span class="font-bold">News & </span> 
        <span class="font-playfair">articles</span>
    </h1>

    <Wave />

    <div class="mx-auto mb-24 mt-6 lg:mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">

        <template v-for="post in blogPosts" :key="post._path">
            <BlogPostBox :post="post" />
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


  const blogPosts = await queryContent('/blog')
  
    .sort({ created_at: -1 }) // show latest articles first
  
    .where({ _partial: false}) // exclude the Partial files
    
    .where({ visible: { $ne: false } })

    .find()
  
</script>