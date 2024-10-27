<template>

<li class="relative flex justify-between items-center gap-x-6 py-5 px-5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">

    <div class="flex items-center min-w-0 gap-x-4">
        <nuxt-img class="h-24 w-24 flex-none rounded-full mr-6" :src="upcoming.slug+'/cover.webp'" alt="" densities="x1" format="webp" :modifiers="{alwaysCDN: true}"/>
        <div class="min-w-0 flex-auto">

            <p class="text-xl leading-6mb-2">
                <nuxt-link :to="upcoming.type+'/'+upcoming.slug" class="text">
                    <span class="absolute inset-x-0 -top-px bottom-0" />
                    {{ upcoming.title }}
                </nuxt-link>
            </p>
            <UBadge v-if="upcoming.type == 'iems'" class="mb-2 uppercase" color="red" variant="outline">IEM</UBadge>
            <UBadge v-else-if="upcoming.type == 'daps'"  class="mb-2 uppercase" color="blue" variant="outline">DAP</UBadge>
            <UBadge v-else-if="upcoming.type == 'dacs'"  class="mb-2 uppercase" color="green" variant="outline">DAC</UBadge>        
        </div>
    </div>

    
    <div class="flex shrink-0 items-center gap-x-4">
        <div class="hidden sm:flex sm:flex-col sm:items-end">
            <div v-if="upcoming.released">Released</div>
            <div v-else>Planned</div>
            <p v-if="upcoming.releaseDate" class="mt-3 text-xl leading-5 font-bold">
                {{ new Date(upcoming.releaseDate).toLocaleString('en-us',{month:'long', day:'numeric', year:'numeric'}) }}
            </p>
          </div>
    </div>

</li>
    
</template>
    
<script setup>

    const props = defineProps({
        upcoming: {
            type: Object,
            required: true
        }
    })
    
 </script>
    