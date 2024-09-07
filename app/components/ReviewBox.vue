<template>

<article class="flex items-start flex-col">

    <div v-if="useRoute().name != 'iems-brand-model'" class="flex gap-2">
        <UBadge class="mb-2 capitalize" color="orange">review</UBadge>
        <UBadge class="mb-2 uppercase" color="red">{{post.gearType}}</UBadge>
    </div>

    <div class="relative w-full transition flex items-center">
    
        <nuxt-img v-if="post.cover" :src="post.cover.filename" alt="" class="aspect-square w-full rounded-2xl bg-gray-100 object-cover" densities="x1" format="webp" width="480" height="480" fit="contain" />
        <nuxt-img v-else 
            src="placeholder.webp" 
            alt="cover" 
            class="aspect-square w-full rounded-2xl bg-gray-100 object-cover  dark:opacity-50"  
            densities="x1" format="webp" width="480" height="480" fit="contain" />

        <nuxt-link :to="'/reviews/' + post.user.username + '/' + post.brand + '/' + post.model" class="absolute inset-0 flex"></nuxt-link>

    </div>

    <div class="mt-2 flex justify-between w-full" v-if="useRoute().name == 'posts-my'">
        <div v-if="!post.published" class="rounded text-xs px-2 py-1 bg-red-400 text-white">Unpublished</div>
        <div v-else class="rounded text-xs px-2 py-1 bg-green-600 text-white">Published</div>
    </div>

    <div class="w-full mt-2">
                
        <div class="group relative">
            <div class="flex w-full items-center gap-3">
                <div class="flex flex-1 justify-between gap-4 mt-0" :class="[size == 'normal' ? 'text-sm' : 'text-xs']">
                    <div class="text-gray-500 dark:text-gray-200 flex items-center justify-center">
                        <UIcon name="i-ph-user" class="mr-1" />
                        <nuxt-link :to="'/users/'+post.user.username" class="text hover:underline">{{ post.user.username }}</nuxt-link>
                    </div>
                    <div class="text-gray-500 dark:text-gray-200  italic flex items-center justify-center">
                        <UIcon name="i-ph-calendar" class="mr-1" />
                        {{ new Date(post.createdAt).toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric'}) }}
                    </div>
                </div>
            </div>
            <h3 v-if="size == 'normal'" class="mt-6 mb-1 text-2xl font-bold leading-6 h-12 align-top">
                <nuxt-link :to="'/reviews/' + post.user.username + '/' + post.brand + '/' + post.model" class="text">
                    {{ post.title }}
                </nuxt-link>
            </h3>
         
            <p v-if="size == 'normal'" class="mt-5 line-clamp-5 text-sm leading-6 min-h-[96px]">{{ post.description }}</p>
        </div>
            
    </div>

</article>
    
</template>
    
<script setup>

const props = defineProps({
    post: {
        type: Object,
        required: true
    },
    size: {
        type: String,
        default: 'normal'
    }
})


</script>