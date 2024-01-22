<template>  

<div class="flex flex-1 flex-col items-center mx-auto leading-loose w-full">
    
    <ContentDoc v-slot="{ doc }">

        <nuxt-img :src="doc.brand +'/logo.webp'" width="150" class="mt-6" format="webp"/>

        <h1 class="text-2xl lg:text-6xl font-bold mt-6 mb-16 flex items-center">
            {{ doc.title }}
        </h1>


        <div class="mb-16 text-xl leading-8 max-w-app">{{ doc.description }}</div>

        <Reviews class="mb-12 max-w-app"/>

        <div class="content w-full">
            <ContentRenderer :value="doc"/>
        </div>

        <Stores v-if="doc.stores && doc.stores.length" :doc="doc"/>

    </ContentDoc>
  
</div>

</template>