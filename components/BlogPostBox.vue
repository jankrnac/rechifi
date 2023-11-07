<template>

<article class="flex flex-col items-start justify-between">
    <div class="relative w-full hover:-translate-y-1 transition">
        <nuxt-img :src="post.cover" alt="" class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
        <nuxt-link :to="post._path" class="absolute inset-0"></nuxt-link>
    </div>
    
    <div class="max-w-xl mt-2">
		<div class="flex justify-between">
			<Label>Recenze</Label>
			<time class="text-gray-500 text-sm">{{ post.date.split('T')[0] }}</time>
		</div>

    
        <div class="group relative">
            <h3 class="mt-6 text-2xl font-bold leading-6">
                <nuxt-link :to="post._path" class="text">{{ post.title }}</nuxt-link>
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
