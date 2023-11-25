<template>  

<div class="flex flex-col items-center max-w-[1200px] mx-auto leading-loose">
    


    <ContentDoc  v-slot="{ doc }">

        <h1 class="text-2xl lg:text-6xl font-bold mt-16 mb-16">
            {{ doc.title }}
        </h1>

        <div class="flex items-center justify-between mb-16">

            <div class="mr-4">

                <ul class="flex gap-3">
                    <li v-for="signature in doc.signature" 
                        class="rounded-xl py-1.5 px-5 capitalize"
                        :class="{
                            'bg-yellow-200': signature == 'bright',
                            'bg-gray-200' : signature == 'neutral',
                            'bg-gray-800 text-white' : signature == 'dark',
                            'bg-orange-200' : signature == 'bass boost',
                            'bg-green-400' : signature == 'v-shaped'
                        }"
                    >
                        {{ signature }}
                    </li>
                    
                </ul>
            </div>


            <div>

                <div class="flex gap-3">
                    <DriverLabel v-for="driver in doc.drivers">{{ driver }}</DriverLabel>
                </div>
            </div>

        </div>

        <div class="mb-16 font-thin text-xl">{{ doc.description }}</div>

        <Reviews v-if="reviews.length" :reviews="reviews" class="mb-12"/>

        <div class="content w-full">
            <ContentRenderer :value="doc"/>
        </div>

    </ContentDoc>
  
</div>

</template>

<script setup>

const route = useRoute()
const { data:reviews } = await useAsyncData(() => queryContent(`/reviews/${route.params.slug[0]}/${route.params.slug[1]}/`).find())

</script>