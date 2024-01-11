<template>

    <Wip />

    {{ aaa }}
</template>

<script setup>

const { data:linsoul } = await useFetch('/api/scraper', {
    method: "POST",
    body: { url: 'https://www.linsoul.com/collections/sale' }
})



</script>