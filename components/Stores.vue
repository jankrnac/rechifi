<template> 

    <div class="w-full max-w-app my-24">
        <div class="flex items-center mb-8">
            <IconsStore class="w-12 h-12 mr-2" />
            <h2 class="text-xl font-bold">Where to buy</h2>
            
        </div>
        <div class="flex gap-12 items-center">
            <div v-for="store in stores">
                <a :href="Object.values(store)[0]" target="_blank">
                    <nuxt-img :src="Object.keys(store)[0] + '/logo.webp'" width="200" height="200" densities="1x"/>
                </a>
            </div>
        </div>
    </div>

</template>

<script setup>

defineProps(['stores'])

</script>