<template>
<div class="mb-6 md:mb-12">
    <h1 class="text-center text-2xl lg:text-4xl font-bold mt-12 mb-2">
        <slot />
    </h1>

    <div class="text-center text-gray-400">Release date: <b class="font-semibold">{{ new Date(doc.releaseDate).toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric'}) }}</b></div>
</div>
</template>

<script setup>
defineProps(['doc'])
</script>