<template>  

    <div class="flex flex-1 flex-col items-center mx-auto leading-relaxed lg:leading-loose w-full">
    
        <ProductsTitle :product="product" />
    
        <ProductsImages :images="product.images" />
    
        <ProductsLabels :product="product" />
    
        <ProductsRating :rating="reviewData.rating" />
    
        <ProductsReviews :product="product"/>
        
        <Comments :product="product"/>
        
    </div>
    
</template>
    
<script setup>
    
    
    const { data:product } = await useFetch(`/api/products/profile/${useRoute().params.brand}/${useRoute().params.model}`)
    
    useSeoMeta({
        title : product.value.title != product.value.model ? product.value.title : product.value.brand.charAt(0).toUpperCase() + product.value.brand.slice(1) + ' ' + product.value.model
    })
    
    const reviewData = []
    
</script>