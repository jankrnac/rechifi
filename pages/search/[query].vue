<template>
    <template v-for="post in posts" :key="post._path">
            {{ post }}
    </template>
</template>

<script setup lang="ts">
    
    const route = useRoute()
    
    const posts = await queryContent('blog').where({ 'title': { $icontains: route.params.query } }).find()
    const headphones = await queryContent('headphones', 'upcoming').where({ 'title': { $icontains: route.params.query } }).find()

</script>