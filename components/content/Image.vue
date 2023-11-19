<template>
    <div class="w-full flex flex-col items-center justify-center">
        <nuxt-img :src="image" :class="[width]"/>
        <div class="text-center text-gray-500 text-sm mt-2">{{ source }}</div>
    </div>
</template>

<script setup>

defineProps(['image', 'width', 'source'])

</script>