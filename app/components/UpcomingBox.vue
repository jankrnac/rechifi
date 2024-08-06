<template>

<li class="relative flex justify-between items-center gap-x-6 py-5">
    <div class="flex items-center min-w-0 gap-x-4">
        <nuxt-img class="h-24 w-24 flex-none rounded-full mr-6" :src="upcoming.cover" alt="" densities="x1" format="webp"/>
        <div class="min-w-0 flex-auto">

            <p class="text-xl leading-6mb-2">
                <nuxt-link :to="upcoming._path" class="text">
                    <span class="absolute inset-x-0 -top-px bottom-0" />
                    {{ upcoming.title }}
                </nuxt-link>
            </p>
            
            <Label class="mt-1">{{ upcoming._path.split('/')[1].slice(0,-1).toUpperCase() }}</Label>
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
    