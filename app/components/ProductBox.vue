<template>


<li :key="product.source" class="relative">
    <div class="bg-[#f6f7f8] dark:bg-gray-800 relative aspect-square block w-full overflow-hidden rounded-lg hover:-translate-y-1 transition p-5">
        <nuxt-img :src="product.cover ? product.cover : 'iem.webp'" alt="" class="pointer-events-none object-cover" densities="x1" format="webp" sizes="200px md:300px lg:351px" :modifiers="{alwaysCDN: true}"/>
        <nuxt-link class="absolute inset-0" :to="product._path"></nuxt-link>
    </div>

    <div v-if="product.showInIndex" class="flex items-center pointer-events-none mt-2 truncate font-semibold" :class="{'text-orange-500': product.released == false}">
        {{ product.title }}
        <div v-if="product.new" class="text-xs bg-red-500 rounded px-1.5 py-1 ml-2 font-normal text-white">New</div>
    </div>
    
    <p v-else class="pointer-events-none mt-2 block font-semibold capitalize" :class="{'text-orange-500': product.released == false}">{{ product._dir + ' ' + product.title }}</p>
    


    <div v-if="product.released == true" class="flex gap-x-2 mb-1">
        <DriverLabel size="small" class="my-1" v-for="driver in product.drivers" :driver="driver"></DriverLabel>
    </div>
    
    <div v-if="product.released == false">Release date: <b class="font-bold">{{product.releaseDate}}</b></div>

    <div v-if="product.priceRange" class="pointer-events-none flex mt -ml-0.5 text-sm font-medium">
        <IconsDollar class="w-4 h-4" :class="[product.priceRange == 'low' || product.priceRange == 'medium' || product.priceRange == 'high' ? 'text-blue-500' : 'text-gray-400']" />
        <IconsDollar class="w-4 h-4" :class="[product.priceRange == 'medium' ||  product.priceRange == 'high'  ? 'text-blue-500' : 'text-gray-400']" />
        <IconsDollar class="w-4 h-4" :class="[product.priceRange == 'high' ? 'text-blue-500' : 'text-gray-400']" />
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
