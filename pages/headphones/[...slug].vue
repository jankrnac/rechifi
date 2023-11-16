<template>  

<div class="flex flex-col items-center max-w-[1200px] mx-auto leading-loose">
    


    <ContentDoc  v-slot="{ doc }">

        <h1 class="text-2xl lg:text-6xl font-bold my-16">
            {{ doc.title }}
        </h1>   

        <Reviews v-if="reviews.length" :reviews="reviews" class="mb-12"/>

        <ContentRenderer :value="doc" />

    </ContentDoc>
  
</div>

</template>

<script setup>

const route = useRoute()
const { data:reviews } = await useAsyncData(() => queryContent(`/reviews/${route.params.slug[0]}/${route.params.slug[1]}`).find())

</script>