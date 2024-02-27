<template>  

    <div class="flex flex-1 flex-col items-center mx-auto leading-relaxed lg:leading-loose w-full">
    
            <!-- Title -->
            <ProductsTitle :doc="doc">{{ doc.title }}</ProductsTitle>
    
            <!-- Description -->
            <ProductsDescription>{{ doc.description }}</ProductsDescription>
    
            <!-- Hero -->
            <ProductsHero v-if="doc.hero" :hero="doc.hero" />
    
            <!-- Images -->
            <ProductsImages v-else :images="doc.images" />
    
            <!-- Labels -->
            <ProductsLabels :doc="doc" />
    
            <!-- Features and Rating -->
            <div class="lg:flex flex-grow w-full max-w-app mb-24">
                <ProductsFeatures v-if="doc.features" :features="doc.features" class="flex-grow mb-24 md:mb-0"/>
    
                <div class="flex flex-grow items-center justify-center">
                    <ProductsOverallRating :rating="rating"/>
                </div>
            </div>
    
            <!-- Reviews -->
            <ProductsReviews class="mb-12 max-w-app"/>
    
            <!-- Technicals -->
            <ProductsTechnical v-if="doc.technicals && doc.technicals.length" :technicals="doc.technicals" :package="doc.package"/>
    
            <!-- Stores -->
            <ProductsStores v-if="doc.stores && doc.stores.length" :stores="doc.stores"/>
    
    </div>
    
    </template>
    
    <script setup>
    
    const client = useSupabaseClient()
    
    const { data:doc } = await useAsyncData('product', () => queryContent(useRoute().path).findOne())
    
    const { data:rating } = await useAsyncData(async () => {
    
        const { data } = await client
        .from('reviews')
        .select('brand, model, elements(data)')
        .eq('brand', useRoute().params.brand)
        .eq('model', useRoute().params.model)
        .eq('elements.type', 'score')
    
        const temp = data.filter(e => e.elements.length).map(q=>q.elements).flat().map(r=>r.data).map(y=>y.score)
    
        return temp.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / temp.length
    })
          
    </script>