<template>

<div>

    {{ review }}

</div>

</template>

<script setup lang="ts">

    const route = useRoute()

    const { data:review } = await useFetch('/api/reviews/' + route.params.slug)

</script>