<template>  

<div class="flex flex-1 flex-col items-center mx-auto leading-relaxed lg:leading-loose w-full">

        <!-- Title -->
        <ProductsTitle :doc="doc" />

        <!-- Images -->
        <ProductsImages v-if="doc.images" :images="doc.images" />

        <!-- Labels -->
        <ProductsLabels :doc="doc" :signature="signature" />

        <!-- Features and Rating -->
        <div class="lg:flex flex-grow w-full max-w-app mb-24">

            <div class="flex flex-grow items-center justify-center">
                <ProductsOverallRating :rating="reviewData.rating"/>
            </div>
        </div>

        <!-- Reviews -->
        <ProductsReviews :reviews="reviews" class="mb-12 max-w-app"/>


        
</div>

</template>

<script setup>

const { data:doc } = await useAsyncData('product', () => queryContent(useRoute().path).findOne())

const { data:reviews } = await useFetch('/api/reviews/data', {
    query: {
        brand: useRoute().params.brand,
        model: useRoute().params.model
    }
})

const reviewData = []

</script>