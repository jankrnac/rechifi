<template>  

<div class="flex flex-1 flex-col items-center mx-auto leading-loose w-full">
    


    <ContentDoc v-slot="{ doc }">

        <nuxt-img :src="doc.brand +'/logo.webp'" sizes="120px md:150px" class="mt-6" format="webp" />

        <h1 class="text-2xl lg:text-6xl font-bold mt-6 mb-16 flex items-center">
            {{ doc.title }}
        </h1>

        <div class="flex flex-col items-center justify-between mb-16 gap-y-16">

            <div>
                <div class="text-center text-gray-500 dark:text-gray-300 text-sm mb-2">Driver configuration</div>
                <div v-if="doc.drivers && doc.drivers.length">
                    <div class="flex gap-3">
                        <DriverLabel v-for="driver in new Set(doc.drivers)" :driver="driver"></DriverLabel>
                    </div>
                </div>
            </div>

            <div v-if="doc.signature">
                <div class="text-center text-gray-500 dark:text-gray-300 text-sm mb-2">Sound signature</div>

                <ul class="flex gap-3">
                    <li v-for="signature in doc.signature" 
                        class="rounded-xl py-2.5 px-5 lg:py-3.5 lg:px-6 capitalize text-sm lg:text-lg font-semibold text-gray-600"
                        :class="{
                            'bg-yellow-200': signature == 'bright',
                            'bg-gray-200 dark:bg-gray-800 dark:text-white' : signature == 'neutral',
                            'bg-gray-800 text-white' : signature == 'dark',
                            'bg-orange-200' : signature == 'bass boost',
                            'bg-green-400' : signature == 'v-shaped',
                            'bg-blue-200' : signature == 'u-shaped'

                        }"
                    >
                        {{ signature }}
                    </li>
                    
                </ul>
                </div>

        </div>

        <div class="mb-16 lg:text-xl leading-8 max-w-app">{{ doc.description }}</div>

        <Reviews class="mb-12 max-w-app"/>

        <div class="content w-full">
            <ContentRenderer :value="doc"/>
        </div>

        <Stores v-if="doc.stores && doc.stores.length" :stores="doc.stores"/>

    </ContentDoc>
  
</div>

</template>