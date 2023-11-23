<template>

   <!-- Featured post -->
   <article class="mb-24">
        <div class="relative rounded-xl overflow-hidden shadow-xl mb-4">
        
        <!-- Image -->
        <div class="w-full select-none">
            <nuxt-img :src="image" class="w-full" sizes="100vw lg:1500px" :modifiers="{ format : 'webp' }" />
        </div>

        <!-- Title, text -->
        <div class="absolute inset-0 ml-12 flex items-center font-bold z-10">
            <div class="inline-flex flex-col text-center ml-[2%] lg:ml-[10%]">
                <div class="text-gray-100 text-2xl lg:text-5xl mb-2 lg:mb-6">{{  }}</div>
                <div class="text-gray-100 text-xl lg:text-4xl">New diamond standart</div>
            </div>
        </div>
        <!-- Overlay -->
        <div class="absolute inset-0 bg-gray-900 opacity-40 z-9"></div>
        
    </div>
    <Label>Recenze</Label>
    <section class="lg:w-2/3">
        <h1 class="text-2xl lg:text-5xl mt-8 mb-8 font-bold leading-relaxed">
            <nuxt-link class="text">The trick to getting more done is to have the freedom to roam around</nuxt-link>
        </h1>
        <p class="text-xl leading-loose">Vel lectus vel velit pellentesque dignissim nec id magna. Cras molestie ornare quam at semper. Proin a ipsum ex. Curabitur eu venenatis justo. Nullam felis augue, imperdiet at sodales. Nullam felis libero, congue quis ipsum et, lacinia maximus eros. Vestibulum ante ipsum primis in faucibus.</p>
    </section>
</article>

</template>

<script setup>

defineProps(['image'])

</script>