<template>
<div class="max-w-app overflow-hidden relative mb-5">

<template v-if="$device.isMobile">
    <Carousel :items-to-show="1">
        <Slide v-for="slide in [1,2,3]" :key="slide">
            <nuxt-img :src="useRoute().params.brand+'/'+useRoute().params.model+`/image${slide}.webp`" format="webp" sizes="480px" height="480px" densities="x1" fit="cover" class="rounded-lg" :modifiers="{alwaysCDN: true}"/>
        </Slide>
    </Carousel>
</template>

<template v-else>
    <Carousel :items-to-show="3">
        <Slide v-for="slide in [1,2,3]" :key="slide">
            <nuxt-img :src="useRoute().params.brand+'/'+useRoute().params.model+`/image${slide}.webp`" format="webp" sizes="480px" height="480px" densities="x1" fit="cover" class="rounded-lg"  :modifiers="{alwaysCDN: true}"/>
        </Slide>
        <template #addons>
            <Navigation />
            <Pagination />
        </template>
    </Carousel>
</template>
</div>

</template>

<script setup>
defineProps(['images'])
</script>

<style scoped>

.carousel {
    /* Make the width 100% plus the width of the gap between slides */
    width: calc(100% + 1.25rem);

    /* replace 0.625rem with half of the gap between slides */
    transform: translateX(-0.625rem)
}

.carousel__slide {
    /* Once again, replace 0.625rem with half of the width you want the gap to be */
    padding-left: 0.625rem;
    padding-right: 0.625rem;
}
</style>