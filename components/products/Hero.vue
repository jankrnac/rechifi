<template>

<div class="max-w-app rounded-xl overflow-hidden relative mb-8">
    <nuxt-img :src="hero" format="webp" sizes="1500px" height="700px" densities="x1" fit="cover" />
</div>

</template>

<script setup>
defineProps(['hero'])
</script>