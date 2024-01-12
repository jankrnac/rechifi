<template>  

<div class="flex flex-1 flex-col items-center mx-auto leading-loose w-full">
    


    <ContentDoc v-slot="{ doc }">

        <nuxt-img :src="doc.brand +'/logo.webp'" width="150" class="mt-6" format="webp"/>

        <h1 class="text-2xl lg:text-6xl font-bold mt-6 mb-16 flex items-center">
            {{ doc.title }}
        </h1>

        <div class="flex items-center justify-between mb-16">

            <div v-if="doc.signature" class="mr-4">

                <ul class="flex gap-3">
                    <li v-for="signature in doc.signature" 
                        class="rounded-xl py-1.5 px-5 capitalize"
                        :class="{
                            'bg-yellow-200': signature == 'bright',
                            'bg-gray-200' : signature == 'neutral',
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

            <div v-if="doc.drivers && doc.drivers.length">
                <div class="flex gap-3">
                    <DriverLabel v-for="driver in new Set(doc.drivers)">{{ doc.drivers.filter(e => e == driver).length > 1 ? doc.drivers.filter(e => e == driver).length + ' ' + driver : driver }}</DriverLabel>
                </div>
            </div>

        </div>

        <div class="mb-16 text-xl leading-8 max-w-app">{{ doc.description }}</div>

        <Reviews class="mb-12 max-w-app"/>

        <div class="content w-full">
            <ContentRenderer :value="doc"/>
        </div>


    </ContentDoc>
  
</div>

</template>