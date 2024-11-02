<template>

<UCarousel v-slot="{ item }" :items="heroes" class="rounded-xl overflow-hidden" ref="carouselRef">
    <div class="rounded-xl overflow-hidden">
    
        <div class="flex items-end justify-between mb-2 gap-2 rounded-xl overflow-hidden">
            <h1 class="text-xl lg:text-2xl font-bold">
                <nuxt-link class="text leading-normal" :to="'/'+ item.product.type + '/' + item.product.slug">{{ item.product.title }}</nuxt-link>
            </h1>

            <div class="flex gap-x-2">
                <UBadge class="mb-2" color="orange">Featured</UBadge>

                <UBadge v-if="item.product.type == 'iems'" class="mb-2 uppercase" color="red" variant="outline">IEM</UBadge>
                <UBadge v-if="item.product.type == 'daps'" class="mb-2 uppercase" color="blue" variant="outline">DAP</UBadge>
                <UBadge v-if="item.product.type == 'dacs'" class="mb-2 uppercase" color="green" variant="outline">DAC</UBadge>        
            </div>
        </div>

        <div class="relative rounded-xl mb-4">
        
            <!-- Bg -->
            <div class="w-full select-none relative z-[1] rounded-xl overflow-hidden">
                <nuxt-img v-if="$device.isDesktop" :src="item.product.slug + '/hero.webp'" sizes="100vw lg:1500px" format="webp" densities="x1" width="1500" height="660" :modifiers="{alwaysCDN: true}"            />
                <nuxt-img v-if="$device.isMobile" :src="item.product.slug + '/hero.webp'" class="object-cover" sizes="400px" fit="contain" format="webp" densities="x1" width="660" height="660" :modifiers="{alwaysCDN: true}" />
            </div>

            <!-- Link -->
            <nuxt-link :to="'/'+ item.product.type + '/' + item.product.slug" class="block absolute inset-0 z-20"></nuxt-link>
        
        </div>
        
    </div>
</UCarousel>


</template>

<script setup>

defineProps(['image','bg', 'type', 'link', 'subtitle','title', 'text', 'desc'])

const { data:heroes } = await useFetch('/api/heroes') 

const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 6000)
})

</script>