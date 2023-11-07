<template>
    {{ posts }}
</template>

<script setup lang="ts">
    
    const route = useRoute()
    
    const posts = await searchContent(route.params.query)

  
</script>