<template>

   <!-- Featured post -->
   <article class="mb-24">
        <div class="relative rounded-xl overflow-hidden shadow-xl mb-4">
        
        <!-- Bg -->
        <div class="w-full select-none relative">
            <nuxt-img :src="bg" class="w-full" sizes="100vw lg:1500px" :modifiers="{ format : 'webp' }" width="1500" height="625"/>

            <div class="absolute w-1/2 right-0 top-0 z-10">
                <nuxt-img :src="image" class="fi" sizes="100vw lg:500px" :modifiers="{ format : 'webp' }" width="600" height="600"/>
            </div>
        </div>

        <!-- Overlay -->
        <div class="absolute inset-0 bg-gray-900 opacity-30 z-9"></div>

        <!-- Link -->
        <nuxt-link :to="link" class="block absolute inset-0 z-20"></nuxt-link>

        <!-- Title, text -->
        <div class="absolute inset-0 ml-12 flex items-center font-bold z-10">
            <div class="inline-flex flex-col text-center ml-[2%] lg:ml-[1%] w-1/2">
                <div class="text-white mb-4 text-xl">{{ subtitle }}</div>
                <div class="text-white text-xl xl:text-6xl">{{ title }}</div>
            </div>
        </div>
        

        
    </div>
    <Label>{{ type }}</Label>
    <section class="lg:w-full">
        <h1 class="text-2xl lg:text-5xl mt-8 mb-8 font-bold">
            <nuxt-link class="text leading-normal" :to="link">{{ text }}</nuxt-link>
        </h1>
        <p class="text-xl leading-loose">{{ desc }}</p>
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

.fi{
    animation: float 4s ease-in-out infinite;
}
</style>