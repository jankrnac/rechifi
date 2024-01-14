<template> 

    <div class="w-full max-w-app my-24">
        <div class="flex items-center mb-12">
            <IconsStore class="w-12 h-12" />
            <div class="ml-2 text-2xl">Where to buy</div>
        </div>
        <div class="flex gap-12 items-center">
            <div v-for="store in doc.stores">
                <a :href="Object.values(store)[0]" target="_blank">
                    <nuxt-img :src="Object.keys(store)[0] + '.webp'" width="200" densities="1x"/>
                </a>
            </div>
        </div>
    </div>

</template>

<script setup>

defineProps(['doc'])

</script>