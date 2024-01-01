<template>


<li :key="product.source" class="relative">
    <div class="relative aspect-square block w-full overflow-hidden rounded-lg hover:-translate-y-1 transition">
        <nuxt-img :src="product.cover ? product.cover : 'iem.webp'" alt="" class="pointer-events-none object-cover" densities="x1"/>
        <nuxt-link class="absolute inset-0" :to="product._path"></nuxt-link>
    </div>

    <p v-if="product.body.children.length" class="pointer-events-none mt-2 block truncate text font-bold" :class="{'text-orange-500': product.released == false}">{{ product.title }}</p>
    <p v-else class="pointer-events-none mt-2 block truncate text font-bold capitalize" :class="{'text-orange-500': product.released == false}">{{ product._dir + ' ' + product.title }}</p>
    

    <div v-if="product.released == true" class="flex gap-x-2">
        <DriverLabel size="small" class="my-1" v-for="driver in new Set(product.drivers)">{{ product.drivers.filter(e => e == driver).length > 1 ? product.drivers.filter(e => e == driver).length + ' ' + driver : driver }}</DriverLabel>
    </div>
    
    <div v-if="product.released == false">Release date: <b class="font-bold">{{product.releaseDate}}</b></div>

    <div v-if="product.priceRange" class="pointer-events-none flex mt-1 text-sm font-medium">
        <IconsDollar class="w-5 h-5" :class="[product.priceRange == 'low' || product.priceRange == 'medium' || product.priceRange == 'high' ? 'text-blue-500' : 'text-gray-400']" />
        <IconsDollar class="w-5 h-5" :class="[product.priceRange == 'medium' ||  product.priceRange == 'high'  ? 'text-blue-500' : 'text-gray-400']" />
        <IconsDollar class="w-5 h-5" :class="[product.priceRange == 'high' ? 'text-blue-500' : 'text-gray-400']" />
    </div>



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
