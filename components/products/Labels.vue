<template>
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

</template>

<script setup>
defineProps(['doc'])
</script>