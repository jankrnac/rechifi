<template>

<article class="flex flex-col items-start justify-between">

    <div class="relative w-full overflow-hidden">
        <nuxt-img :src="post.cover" alt="" class="aspect-[3/2] w-full rounded-2xl bg-gray-100 object-cover" width="480" height="270" densities="x1"/>
        <nuxt-link v-if="post.label == 'article'" :to="post._path" class="absolute inset-0"></nuxt-link>
        <nuxt-link v-if="post.label == 'headphones'" :to="post.link" class="absolute inset-0"></nuxt-link>

    </div>
    
    <div class="max-w-xl mt-2">
		<div class="flex justify-between items-center">
			<Label>{{ post.label }}</Label>
            <time class="text-gray-500 text-sm">{{ new Date(post.date).toLocaleString('en-us',{month:'long', day:'numeric', year:'numeric'}) }}</time>
		</div>

    
        <div class="group relative">
            <h3 class="mt-6 text-2xl font-bold leading-6">
                <nuxt-link v-if="post.label == 'article'" :to="post._path" class="text">{{ post.title }}</nuxt-link>
                <nuxt-link v-if="post.label == 'headphones'" :to="post.link" class="text">{{ post.title }}</nuxt-link>

            </h3>
            <p class="mt-5 line-clamp-4 text-base leading-6">{{ post.description }}</p>
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
