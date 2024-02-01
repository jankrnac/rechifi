<template> 

    <div class="w-full max-w-app my-24">
        <div class="flex justify-center md:justify-start mb-16">
            <h2 class="text-xl font-bold">Where to buy</h2>
            
        </div>
        <div class="flex gap-12 items-center justify-center md:justify-start flex-wrap">
            <div v-for="store in stores" class="shrink-0">
                <a :href="Object.values(store)[0]" target="_blank">
                    <nuxt-img :src="Object.keys(store)[0] + '/logo.webp'" width="200" height="200" densities="1x" class="dark:invert"/>
                </a>
            </div>
        </div>
    </div>

</template>

<script setup>

defineProps(['stores'])

</script>