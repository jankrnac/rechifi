<template>

    <div class="mx-auto lg:mt-32 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
        <template v-for="post in blogPosts" :key="post._path">
            <BlogPostBox :post="post" />
        </template>
    </div>
    
</template>

<script setup lang="ts">
  
    const { data:blogPosts } = await useAsyncData('posts', () => queryContent('/blog')
        .sort({ date: -1 }) // show latest articles first
        .where({ _partial: false }) // exclude the Partial files
        .find() 
    )

</script>