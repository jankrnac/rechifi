<template>

<li :key="product.source" class="relative">

    <div class="relative aspect-square block w-full overflow-hidden rounded-lg hover:-translate-y-1 transition">
        <nuxt-img :src="product.cover" alt="" class="pointer-events-none object-cover" />
        <nuxt-link class="absolute inset-0" :to="product._path"></nuxt-link>
    </div>
    <p class="pointer-events-none mt-2 block truncate text font-bold" :class="{'text-orange-500': product.released == false}">{{ product.fullname }}</p>
    <Label v-if="product.released != false" class="capitalize my-1">{{ product.drivers[0] }}</Label>
    <div v-else>Not released yet</div>

    <div v-if="product.released != false" class="pointer-events-none flex mt-1 text-sm font-medium">
        <IconsDollar class="w-5 h-5" :class="[product.priceRange == 'low' || product.priceRange == 'medium' || product.priceRange == 'high' ? 'text-blue-500' : 'text-gray-400']" />
        <IconsDollar class="w-5 h-5" :class="[product.priceRange == 'medium' ? 'text-blue-500' : 'text-gray-400']" />
        <IconsDollar class="w-5 h-5" :class="[product.priceRange == 'hight' ? 'text-blue-500' : 'text-gray-400']" />
    </div>

    <div v-else>Release date: <b class="font-bold">{{ new Date(product.releaseDate).toLocaleDateString() }}</b></div>

</li>
    
</template>

<script setup>

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

</script>
