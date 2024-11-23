<template>

<li :key="product.source" class="relative">

    <div v-if="useRoute().name != 'users-username'" class="flex flex-grow items-center justify-end mb-1 md:mb-2 gap-1 mad:gap-2gap-2 opacity-60 text-sm">
        <UIcon 
            v-if="(loggedIn && product.likes.map(e=>e.userId).includes(user.id) || !loggedIn && product.likes.map(e=>e.guestId).includes(guest))"
            name="i-ph-heart-fill" 
            class="text-red-600"
            size="16px"
        />
        <UIcon v-else name="i-ph-heart-light" size="16px"/>
        <div>{{ product.likes.length }}</div>
    </div>

    <div class="bg-[#f6f7f8] dark:bg-gray-900 relative aspect-[1] block w-full overflow-hidden rounded-lg hover:-translate-y-1 transition md:p-5">
        <nuxt-img :src="product.slug + '/cover.webp'"
            alt="" 
            class="pointer-events-none object-cover rounded-lg" 
            densities="x1" 
            format="webp" 
            sizes="200px md:300px lg:351px" 
            :modifiers="{alwaysCDN: true}"
        />
        <nuxt-link class="absolute inset-0" :to="'/'+product.type + '/' + product.slug" :aria-label="product.title"></nuxt-link>
    </div>

    <div class="flex items-center pointer-events-none mt-2 truncate font-semibold" :class="{'text-orange-500': product.released == false}">
        {{ product.title }}
        <div v-if="product.new" class="text-xs bg-red-500 rounded px-1.5 py-1 ml-2 font-normal text-white">New</div>
    </div>
        


    <div v-if="product.drivers" class="flex gap-x-2 mb-1">
        <DriverLabel size="small" class="my-1" v-for="driver in product.drivers" :driver="driver"></DriverLabel>
    </div>
    
    <div v-if="product.priceRange" class="pointer-events-none flex mt -ml-0.5 text-sm font-medium">
        <UIcon name="i-ph-currency-dollar-simple" class="w-4 h-4" :class="[product.priceRange == 'low' || product.priceRange == 'medium' || product.priceRange == 'high' ? 'text-blue-500' : 'text-gray-400']" />
        <UIcon name="i-ph-currency-dollar-simple" class="w-4 h-4" :class="[product.priceRange == 'medium' ||  product.priceRange == 'high'  ? 'text-blue-500' : 'text-gray-400']" />
        <UIcon name="i-ph-currency-dollar-simple" class="w-4 h-4" :class="[product.priceRange == 'high' ? 'text-blue-500' : 'text-gray-400']" />
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

const { loggedIn, user } = useUserSession()

const guest = useCookie('guest')

</script>

