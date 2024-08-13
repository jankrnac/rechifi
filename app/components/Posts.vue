<template>

    <div class="mx-auto lg:mb-32 mb-16 lg:mt-16 grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-2 lg:grid-cols-3 lg:mx-0 lg:max-w-none xl:grid-cols-4">
        <template v-for="post in posts">
            <ArticleBox v-if="post.type == 'article'" :post="post" />
            <ReviewBox v-else :review="post"/>
        </template>
    </div>
    
</template>

<script setup>
  
    const { data:posts } = await $fetch('/api/posts')



</script>