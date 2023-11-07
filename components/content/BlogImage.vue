<template>
    <div class="my-16 rounded-xl overflow-hidden">
        <nuxt-img :src="src" class="w-full"/>
    </div>
</template>

<script setup>
defineProps(['src'])
</script>