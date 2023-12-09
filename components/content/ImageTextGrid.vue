<template>

<div class="max-w-[1200px] mx-auto">
<div role="list" class="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
    <div v-for="item in cards" :key="item.source" class="relative">
        <div class="aspect-square block w-full overflow-hidden rounded-lg">
            <nuxt-img :src="item.card.image" :alt="item.card.title" class="pointer-events-none object-cover" densities="x1"/>
        </div>
        <h3 class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{{ item.card.title }}</h3>
        <p class="pointer-events-none block text-sm font-medium text-gray-700">{{ item.card.text }}</p>

    </div>
</div>
</div>
</template>

<script setup>

    defineProps(['cards'])

</script>
