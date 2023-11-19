<template>  

<div class="flex flex-col items-center max-w-[1200px] mx-auto leading-loose">
    


    <ContentDoc  v-slot="{ doc }">

        <h1 class="text-2xl lg:text-6xl font-bold mt-16 mb-6">
            {{ doc.title }}
        </h1>

        <div class="flex items-center mb-16">

            <div>
                <div class="text-gray-500">Sound signature</div>

                <ul class="flex gap-3">
                    <li v-for="signature in doc.signature" 
                        class="rounded-xl py-1.5 px-5 capitalize"
                        :class="{
                            'bg-yellow-200': signature == 'bright',
                            'bg-gray-200' : signature == 'neutral',
                            'bg-gray-800 text-white' : signature == 'dark',
                            'bg-orange-200' : signature == 'warm'
                        }"
                    >
                        {{ signature }}
                    </li>
                    
                </ul>
            </div>

            <IconsWave class="w-8 h-8 mx-6 mt-8"/>

            <div>
                <div class="text-gray-500">Drivers</div>

                <ul class="flex gap-3">
                    <li v-for="driver in doc.drivers" 
                        class="rounded-xl px-4 py-2 flex items-center justify-center text-sm font-semibold border-4"
                        :class="{
                            'border-orange-500': driver == 'DD',
                            'bg-gray-200' : signature == 'neutral',
                            'bg-gray-800 text-white' : signature == 'dark',
                            'bg-orange-200' : signature == 'warm'
                        }"
                    >
                        {{ driver }}
                    </li>
                    
                </ul>
            </div>

        </div>

        <div class="mb-16">{{ doc.description }}</div>

        <Reviews v-if="reviews.length" :reviews="reviews" class="mb-12"/>

        <div class="content w-full">
            <ContentRenderer :value="doc"/>
        </div>

    </ContentDoc>
  
</div>

</template>

<script setup>

const route = useRoute()
const { data:reviews } = await useAsyncData(() => queryContent(`/reviews/${route.params.slug[0]}/${route.params.slug[1]}`).find())

</script>