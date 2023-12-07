<template>
    <div class="w-full flex flex-col items-center justify-center mb-24">
        <nuxt-img :src="image" :width="w" :height="h" class="rounded-xl"/>
        <nuxt-link :to="source" external target="_blank" class="text-center text-gray-500 text-xs mt-1 italic">{{ source }}</nuxt-link>
    </div>
</template>

<script setup>

defineProps(['image', 'w', 'h', 'source'])

</script>