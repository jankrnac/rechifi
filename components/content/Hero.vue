<template>

   <!-- Featured post -->
   <article class="mb-12 lg:mb-32" v-if="hero">
    
        <div class="flex items-center mb-2 gap-2">
            <Label v-for="label in hero.labels" class="capitalize">{{ label }}</Label>
        </div>

        <div class="relative rounded-xl overflow-hidden shadow-xl mb-4">
        
        <!-- Bg -->
        <div class="w-full select-none relative z-[1]">
            <nuxt-img :src="hero.hero" sizes="100vw lg:1500px" format="webp" densities="x1" width="1500" height="660"/>
        </div>

        <!-- Overlay -->
        <div class="absolute inset-0 bg-gray-900 opacity-0 z-9"></div>

        <!-- Link -->
        <nuxt-link :to="hero.link" class="block absolute inset-0 z-20"></nuxt-link>
        
    </div>


    <section class="lg:w-full">
        <h1 class="text-xl lg:text-5xl mt-8 mb-8 font-bold">
            <nuxt-link class="text leading-normal" :to="hero.link">{{ hero.title }}</nuxt-link>
        </h1>
        <p class="text-base leading-relaxed lg:leading-loose lg:text-xl">{{ hero.description }}</p>
    </section>
</article>

</template>

<script setup>

defineProps(['image','bg', 'type', 'link', 'subtitle','title', 'text', 'desc'])

const { data:hero } = await useAsyncData('hero', () => queryContent('/blog').where({ isHero: true }).findOne())

</script>