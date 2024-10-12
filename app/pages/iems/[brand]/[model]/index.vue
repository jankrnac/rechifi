<template>  

<div class="flex flex-1 flex-col items-center mx-auto leading-relaxed lg:leading-loose w-full">

    <!-- Title -->
    <ProductsTitle :doc="doc" />

    <!-- Images -->
    <ProductsImages v-if="doc.images" :images="doc.images" />

    <!-- Labels -->
    <ProductsLabels :doc="doc" />

    <!-- Features and Rating -->
    <div class="lg:flex flex-grow w-full max-w-app mb-24">

        <div class="flex flex-grow items-center justify-center">
            <ProductsOverallRating :rating="reviewData.rating"/>
        </div>
    </div>

    <!-- Reviews -->
    <ProductsReviews :reviews="reviews" class="max-w-app"/>
    
    <div class="w-full max-w-app mx-auto mb-24">

        <Comments :gear="doc._path"/>

    </div>
    
</div>

</template>

<script setup>


const { data:doc } = await useAsyncData('product', () => queryContent(useRoute().path).findOne())

useContentHead({
    title : doc.value.title != doc.value.model ? doc.value.title : doc.value.brand.charAt(0).toUpperCase() + doc.value.brand.slice(1) + ' ' + doc.value.model
})

const { data:reviews } = await useFetch('/api/reviews/data', {
    query: {
        brand: useRoute().params.brand,
        model: useRoute().params.model
    }
})

const reviewData = []

</script>