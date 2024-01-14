<template>

   <!-- Featured post -->
   <article class="mb-12 lg:mb-24">
        <div class="relative rounded-xl overflow-hidden shadow-xl mb-4">
        
        <!-- Bg -->
        <div class="w-full select-none relative">
            <nuxt-img :src="bg" class="w-full" sizes="100vw lg:1500px" format="webp" densities="x1" width="1500" height="660"/>

            <!-- Floating image -->
            <div v-if="image" class="absolute w-1/2 lg:right-0 right-10 top-0 z-10 flex items-center h-full">
                <nuxt-img :src="image" class="floating object-contain aspect-square" width="600" height="600" format="webp"/>
            </div>
        </div>

        <!-- Overlay -->
        <div class="absolute inset-0 bg-gray-900 opacity-30 z-9"></div>

        <!-- Link -->
        <nuxt-link :to="link" class="block absolute inset-0 z-20"></nuxt-link>

        <!-- Title, text -->
        <div class="hidden absolute inset-0 ml-12 lg:flex items-center z-10">
            <div class="inline-flex flex-col text-center ml-[2%] lg:ml-[1%] w-1/2">
                <div class="text-white/90 mb-4 text-xl font-semibold">{{ subtitle }}</div>
                <div class="text-white/90 text-xl xl:text-6xl font-bold">{{ title }}</div>
            </div>
        </div>
        

        
    </div>

    <div class="flex justify-between items-center">
        <Label>{{ type }}</Label>
    </div>

    <section class="lg:w-full">
        <h1 class="text-xl lg:text-5xl mt-8 mb-8 font-bold">
            <nuxt-link class="text leading-normal" :to="link">{{ text }}</nuxt-link>
        </h1>
        <p class="text-base leading-relaxed lg:leading-loose lg:text-xl">{{ desc }}</p>
    </section>
</article>

</template>

<script setup>

defineProps(['image','bg', 'type', 'link', 'subtitle','title', 'text', 'desc'])

</script>

<style scoped>

@keyframes float {
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(-10px);
	}
	100% {
		transform: translatey(0px);
	}
}

.floating{
    animation: float 4s ease-in-out infinite;
}
</style>