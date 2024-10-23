<template>

   <article class="mb-12 lg:mb-32" v-if="heroes" v-for="hero in heroes">
   
        <div class="flex items-center mb-2 gap-2">
            <UBadge v-if="hero.product.type == 'iems'" class="mb-2 uppercase" color="orange">NEW</UBadge>

            <UBadge v-if="hero.product.type == 'iems'" class="mb-2 uppercase" color="red" variant="outline">IEM</UBadge>
            <UBadge v-if="hero.product.type == 'daps'" class="mb-2 uppercase" color="blue" variant="outline">DAP</UBadge>
            <UBadge v-if="hero.product.type == 'dacs'" class="mb-2 uppercase" color="green" variant="outline">DAC</UBadge>        
        
        </div>

        <div class="relative rounded-xl overflow-hidden shadow-xl mb-4">
        
        <!-- Bg -->
        <div class="w-full select-none relative z-[1]">
            <nuxt-picture v-if="$device.isDesktop" :src="hero.product.slug + '/hero.webp'" sizes="100vw lg:1500px" format="webp" densities="x1" width="1500" height="660" :modifiers="{alwaysCDN: true}"            />
            <nuxt-picture v-if="$device.isMobile" :src="hero.cover" sizes="100vw lg:1500px" format="webp" densities="x1" width="660" height="660"/>
        </div>

        <!-- Overlay -->
        <div class="absolute inset-0 bg-gray-900 opacity-0 z-9"></div>

        <!-- Link -->
        <nuxt-link :to="hero.link" class="block absolute inset-0 z-20"></nuxt-link>
        
    </div>


    <section class="lg:w-full">
        <h1 class="text-xl lg:text-5xl my-2 lg:my-8 font-bold">
            <nuxt-link class="text leading-normal" :to="hero.link">{{ hero.product.title }}</nuxt-link>
        </h1>
        <p class="text-base leading-relaxed lg:leading-loose lg:text-xl">{{ hero.description }}</p>
    </section>
</article>

</template>

<script setup>

defineProps(['image','bg', 'type', 'link', 'subtitle','title', 'text', 'desc'])

const { data:heroes } = await useFetch('/api/heroes') 

</script>