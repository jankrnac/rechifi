<template>

<li class="relative flex justify-between items-center gap-x-6 py-5">
    <div class="flex items-center min-w-0 gap-x-4">
        <nuxt-img class="h-24 w-24 flex-none rounded-full bg-gray-50 mr-6" :src="upcoming.cover" alt="" />
        <div class="min-w-0 flex-auto">

            <p class="text-xl leading-6 text-gray-900 mb-2">
                <nuxt-link :to="upcoming._path" class="text">
                    <span class="absolute inset-x-0 -top-px bottom-0" />
                    {{ upcoming.title }}
                </nuxt-link>
            </p>
            
            <div>{{ upcoming.brand }}</div>
        </div>
    </div>

    
    <div class="flex shrink-0 items-center gap-x-4">
        <div class="hidden sm:flex sm:flex-col sm:items-end">
            <Label v-if="Date(upcoming.releaseDate) < Date.now()">Released</Label>
            <Label v-else>Planned</Label>
            <p v-if="upcoming.releaseDate" class="mt-3 text-xl leading-5 font-bold">
                <time :datetime="upcoming.releaseDate">{{upcoming.releaseDate}}</time>
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
    