<template>


<article class="flex items-start flex-col">
    
    <div class="flex gap-2">
        <Label v-for="label in post.labels" class="mb-2 capitalize">{{ label }}</Label>
    </div>

    <div class="relative w-full overflow-hidden">
        <nuxt-img v-if="post.coverId" :src="post.cover" alt="" class="aspect-square w-full rounded-2xl bg-gray-100 object-cover" width="480" height="480" densities="x1"/>
        <nuxt-img v-else src="placeholder.webp" alt="" class="aspect-square w-full rounded-2xl bg-gray-100 object-cover" width="480" height="480" densities="x1"/>

        <nuxt-link :to="'/blog/'+post.slug" class="absolute inset-0"></nuxt-link>

    </div>
    
    <div class="mt-2">
		<div class="flex justify-between items-center">
            <div></div>
            <div class="text-gray-500 dark:text-gray-200 text-sm italic flex items-center justify-center">
                <IconsCalendar class="w-4 h-4 mr-1" />
                {{ new Date(post.createdAt).toLocaleString('en-us',{month:'long', day:'numeric', year:'numeric'}) }}
            </div>		
        </div>

    
        <div class="group relative">
            <h3 class="mt-6 text-2xl font-bold leading-6">
                <nuxt-link v-if="post.type == 'article'" :to="post._path" class="text">{{ post.title }}</nuxt-link>
                <nuxt-link v-if="post.type == 'product'" :to="post.link" class="text">{{ post.title }}</nuxt-link>

            </h3>
            <p class="mt-5 line-clamp-5 text-sm leading-6">{{ post.description }}</p>
        </div>
         
    </div>

</article>

</template>

<script setup>

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})

</script>
