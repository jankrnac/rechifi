<template>

<article class="flex items-start flex-col">

    <div class="flex items-center w-full">
        <div class="flex gap-2">
            <UBadge class="mb-2 capitalize" color="cyan">gear</UBadge>
        </div>

 
    </div>

    <div class="bg-[#f6f7f8] dark:bg-gray-800 relative aspect-[1] block w-full overflow-hidden rounded-lg hover:-translate-y-1 transition md:p-5">
        <nuxt-img :src="product.slug + '/cover.webp'"
            alt="" 
            class="pointer-events-none object-cover rounded-lg" 
            densities="x1" 
            format="webp" 
            sizes="400px md:500px lg:351px" 
            :modifiers="{alwaysCDN: true}"
        />
        <nuxt-link class="absolute inset-0" :to="'/'+product.type+'/'+product.slug" :aria-label="product.title"></nuxt-link>
    </div>

    <div class="mt-2 w-full">
		<div class="flex flex-1 justify-between items-center text-gray-500 dark:text-gray-200">
            <div class="text-sm flex items-center justify-center">
                <UIcon name="i-ph-factory" class="mr-1" />
                <nuxt-link class="capitalize">{{product.brand}}</nuxt-link>
            </div>
            <div class="text-sm italic flex items-center justify-center">
                <UIcon name="i-ph-calendar" class="mr-1" />
                {{ new Date(product.createdAt).toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric'}) }}
            </div>		
        </div>
        
        <div class="group relative">
            <h3 class="mt-6 text-2xl font-bold leading-6">
                <nuxt-link :to="product._path" class="text">{{ product.title }}</nuxt-link>
            </h3>
        </div>
    </div>


    
</article>
        
    </template>
    
    <script setup>
    
    const props = defineProps({
        product: {
            type: Object,
            required: true
        }
    })
    
    </script>
    