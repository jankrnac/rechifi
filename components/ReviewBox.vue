<template>

<article class="flex flex-col items-start justify-between">

    <div v-if="useRoute().name != 'iems-brand-model'" class="flex gap-2">
        <Label class="mb-2 capitalize" color="orange">review</Label>
        <Label class="mb-2" color="blue">{{review.type.toUpperCase()}}</Label>
    </div>

    <div class="relative w-full transition h-full flex items-center">
    
        <nuxt-img v-if="review.cover" :src="review.cover" alt="" class="aspect-square w-full rounded-2xl bg-gray-100 object-cover" densities="x1" format="webp" width="480" height="480" fit="contain" />
        <nuxt-img v-else src="placeholder.webp" alt="" class="aspect-square w-full rounded-2xl bg-gray-100 object-cover" densities="x1" format="webp" width="480" height="480" />

        <nuxt-link :to="review._path" class="absolute inset-0"></nuxt-link>

        <nuxt-link :to="'/reviews/' + review.profiles.username + '/' + review.brand + '/' + review.model" class="absolute inset-0 flex"></nuxt-link>

    </div>

    <div class="mt-2 flex justify-between w-full" v-if="useRoute().name == 'reviews-my'">
        <div v-if="!review.published" class="rounded text-xs px-2 py-1 bg-red-400 text-white">Unpublished</div>
        <div v-else class="rounded text-xs px-2 py-1 bg-green-600 text-white">Published</div>
    </div>

    <div class="w-full mt-2">
                
        <div class="group relative">
            <div class="flex w-full items-center gap-3">
                <div class="flex flex-1 justify-between gap-4 mt-0" :class="[size == 'normal' ? 'text-sm' : 'text-xs']">
                    <div class="text-gray-500 dark:text-gray-200 flex items-center justify-center">
                        <Icon name="ph:user-light" size="16px" class="mr-1" />
                        <nuxt-link :to="'/users/'+review.profiles.username" class="text font-semibold">{{ review.profiles.username }}</nuxt-link>
                    </div>
                    <div class="text-gray-500 dark:text-gray-200  italic flex items-center justify-center">
                        <IconsCalendar class="w-4 h-4 mr-1" />
                        {{ new Date(review.created_at).toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric'}) }}
                    </div>
                </div>
            </div>
            <h3 v-if="size == 'normal'" class="mt-6 mb-1 text-2xl font-bold leading-6">
                <nuxt-link :to="'/reviews/' + review.profiles.username + '/' + review.brand + '/' + review.model" class="text">
                    {{ review.product_title }}
                </nuxt-link>
            </h3>
         
            <p v-if="size == 'normal'" class="mt-5 line-clamp-5 text-sm leading-6 min-h-[96px]">{{ review.description }}</p>
        </div>
            
    </div>

</article>
    
</template>
    
<script setup>

const props = defineProps({
    review: {
        type: Object,
        required: true
    },
    size: {
        type: String,
        default: 'normal'
    }
})


</script>