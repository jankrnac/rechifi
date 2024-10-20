<template>
<div class="mb-6 md:mb-12">
    <h1 class="text-center text-2xl lg:text-4xl font-bold mt-12 mb-2">
        {{product.title}}
    </h1>

    <div v-if="product.releaseDate" class="text-center text-gray-500 text-sm md:text-base">Release date: <b class="font-semibold">{{ new Date(product.releaseDate).toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric'}) }}</b></div>

    <div v-if="product.priceRange" class="pointer-events-none flex mt-4 justify-center">
        <UIcon name="i-ph-currency-dollar-simple-bold" size="20px" :class="[product.priceRange == 'low' || product.priceRange == 'medium' || product.priceRange == 'high' ? 'text-blue-500' : 'text-gray-300']" />
        <UIcon name="i-ph-currency-dollar-simple-bold" size="20px" :class="[product.priceRange == 'medium' ||  product.priceRange == 'high'  ? 'text-blue-500' : 'text-gray-300']" />
        <UIcon name="i-ph-currency-dollar-simple-bold" size="20px" :class="[product.priceRange == 'high' ? 'text-blue-500' : 'text-gray-300']" />
    </div>

</div>
</template>

<script setup>
defineProps(['product'])
</script>