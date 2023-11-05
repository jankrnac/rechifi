<template>

<div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl lg:text-6xl my-4 lg:my-16">
            <span class="font-bold">Novinky & </span> 
            <span class="font-playfair">články</span>
        </h1>

    <ul>

        <li v-for="{ _path: slug, title } in blogPosts" :key="slug">

        <NuxtLink :to="slug">{{ title }}</NuxtLink>

        </li>

        </ul>

</div>

</template>

<script setup lang="ts">
  
  const blogPosts = await queryContent('/blog')
  
    .sort({ date: -1 }) // show latest articles first
  
    .where({ _partial: false }) // exclude the Partial files
  
    .find()
  
</script>