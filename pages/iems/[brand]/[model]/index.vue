<template>  

<div class="flex flex-1 flex-col items-center mx-auto leading-relaxed lg:leading-loose w-full">

        <h1 class="text-2xl lg:text-4xl font-bold mt-12 mb-6 md:mb-12">
            {{ doc.title }}
        </h1>

        <div class="mb-8 md:mb-16 max-w-app">{{ doc.description }}</div>

        <!-- Hero -->
        <div v-if="doc.hero" class="max-w-app rounded-xl overflow-hidden relative mb-8">
           <nuxt-img :src="doc.hero" format="webp" sizes="1500px" height="700px" densities="x1" fit="cover" />

           <!--
           <div class="absolute left-5 bottom-5">
                <nuxt-img :src="doc.brand +'/logo.webp'" sizes="120px md:150px" class="mt-6" format="webp" />
           </div>
           -->
        </div>

        <!-- Images -->
        <div v-else class="flex gap-6 max-w-app overflow-hidden relative mb-8">

            <template v-if="$device.isMobile">
                <Carousel :items-to-show="1">
                    <Slide v-for="slide in doc.images" :key="slide">
                        <nuxt-img :src="slide" format="webp" sizes="480px" height="480px" densities="x1" fit="cover" class="rounded-lg"/>
                    </Slide>
                </Carousel>
            </template>

            <template v-else>
                <Carousel :items-to-show="3">
                    <Slide v-for="slide in doc.images" :key="slide">
                        <nuxt-img :src="slide" format="webp" sizes="480px" height="480px" densities="x1" fit="cover" class="rounded-lg"/>
                    </Slide>
                    <template #addons>
                        <Navigation />
                        <Pagination />
                    </template>
                </Carousel>
            </template>
        </div>

   
        <div class="flex w-full max-w-app items-start justify-between mb-16 md:mb-32">

            <div v-if="doc.drivers && doc.drivers.length">
                <div class="flex">
                    <div class="flex flex-grow justify-center items-center">
                    </div>
                    <div class="flex flex-col md:flex-row items-start gap-3">
                        <DriverLabel v-for="driver in doc.drivers" :driver="driver"></DriverLabel>
                    </div>
                </div>
            </div>

            <div v-if="doc.signature">
                <ul class="flex flex-col md:flex-row items-end gap-3">
                    <li v-for="signature in doc.signature" 
                        class="rounded-xl py-2.5 px-5 lg:py-3 lg:px-6 capitalize text-sm lg:text-lg font-semibold text-gray-800"
                        :class="{
                            'bg-yellow-200': signature == 'bright',
                            'bg-gray-200 dark:bg-gray-800 dark:text-white' : signature == 'neutral',
                            'bg-gray-800 text-white' : signature == 'dark',
                            'bg-orange-200' : signature == 'bass boost' || signature.includes('warm'),
                            'bg-green-400' : signature == 'v-shaped',
                            'bg-blue-200' : signature == 'u-shaped'

                        }"
                    >
                        {{ signature }}
                    </li>
                    
                </ul>
                </div>

        </div>

        <div class="flex flex-grow w-full max-w-app mb-24">
            <Features v-if="doc.features" :features="doc.features" class="flex-grow"/>

            <div class="flex flex-grow items-center justify-center">
                <OverallRating />
            </div>
        </div>

        <Reviews class="mb-12 max-w-app"/>

        <Technical v-if="doc.technicals && doc.technicals.length" :technicals="doc.technicals" :package="doc.package"/>

        <Stores v-if="doc.stores && doc.stores.length" :stores="doc.stores"/>

</div>

</template>

<script setup>

const { data:doc } = await useAsyncData('product', () => queryContent(useRoute().path).findOne())

</script>