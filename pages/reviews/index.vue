<template>

    <div class="flex flex-col items-center justify-center">
        <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-6">
            <span class="font-bold">Reviews & </span> 
            <span class="font-playfair">score</span>
        </h1>
    
        <nuxt-img src="wave.png" class="h-12 mb-16"/>
    
        <div class="mx-auto lg:mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">
    
            <template v-for="post in blogPosts" :key="post._path">
                <BlogPostBox :post="post" />
            </template>
    
        </div>
    
    </div>
    
    </template>
    
    <script setup lang="ts">
      
      const blogPosts = await queryContent('/blog')
      
        .sort({ date: -1 }) // show latest articles first
      
        .where({ _partial: false }) // exclude the Partial files
      
        .find()
      
    </script>a