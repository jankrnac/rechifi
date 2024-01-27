<template>  

<div class="flex flex-1 flex-col items-center mx-auto leading-loose w-full">
    
    <ContentDoc v-slot="{ doc }">

        <h1 class="text-2xl lg:text-4xl font-bold mt-12 mb-6 md:mb-12">
            {{ doc.title }}
        </h1>

        <div class="mb-8 md:mb-16 lg:text-lg max-w-app">{{ doc.description }}</div>

        
        <div class="max-w-app rounded-xl overflow-hidden relative mb-8">
           <nuxt-img v-if="doc.hero" :src="doc.hero" format="webp" sizes="1500px" height="700px" densities="x1" fit="cover" />

           <!--
           <div class="absolute left-5 bottom-5">
                <nuxt-img :src="doc.brand +'/logo.webp'" sizes="120px md:150px" class="mt-6" format="webp" />
           </div>
           -->
        </div>
        
        <Reviews class="mb-12 max-w-app"/>

        <div class="content w-full">
            <ContentRenderer :value="doc"/>
        </div>

        <Stores v-if="doc.stores && doc.stores.length" :doc="doc"/>

    </ContentDoc>
  
</div>

</template>