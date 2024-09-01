<template>

    <div class="flex flex-col flex-grow gap-12 justify-center items-center">

        <h1 class="text-3xl lg:text-6xl">
            <span class="font-bold">Enter article </span> 
            <span class="font-playfair">caption</span>
        </h1>

        <UInput padded size="xl" class="w-full max-w-[600px]" v-model="title"></UInput>

        <div class="flex flex-col items-center">
            Your slug will be:
            <div class="font-semibold min-h-6">{{ $slugify(title) }}</div>
        </div>

        <UButton icon="i-ph-check" size="xl" @click="createArticle">Create</UButton>
    </div>
</template>


<script setup>


definePageMeta({
    middleware: 'auth'
});

const title = ref('')

const createArticle = async () => {
    const result = await $fetch('/api/posts', {
        method: "POST",
        body: {
            type: 'article',
            title: title.value
        }
    })

    if (result)
    {
        await navigateTo('/blog/'+result.slug+'/edit')
    }
}

</script>