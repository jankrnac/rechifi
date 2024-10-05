<template>

<div class="flex md:flex-row flex-col w-full max-w-app items-start justify-between mb-16 md:mb-32 flex-wrap">

    <div>
        <template v-if="useRoute().fullPath.includes('iems')">
        <div class="text-sm mb-2 font-semibold">Driver composition</div>
        <div class="flex">
            
            <div class="flex flex-col md:flex-row items-start gap-3">
                <DriverLabel v-for="driver in doc.drivers" :driver="driver"></DriverLabel>
            </div>
        </div>
        </template>
    </div> 

    <div>
        <div class="text-sm mb-2 lg:text-right mt-6 lg:mt-0 font-semibold">Sound signature</div>

        <ul v-if="signature" class="flex flex-col md:flex-row items-end gap-3">
            
            <li v-for="sig in signature" 
                class="rounded-xl py-2.5 px-5 lg:py-3 lg:px-6 capitalize text-sm lg:text-lg font-semibold"
                :class="{
                    'bg-yellow-200': sig == 'bright',
                    'bg-gray-200 dark:bg-gray-800 dark:text-white' : sig == 'neutral',
                    'bg-gray-800 text-white' : sig == 'dark',
                    'bg-orange-300 dark:bg-orange-800' : sig == 'bass boost' || sig.includes('warm'),
                    'bg-green-400 dark:bg-green-800' : sig == 'v-shaped',
                    'bg-blue-200' : sig == 'u-shaped'

                }"
            >
                {{ signature }}
            </li>
            
        </ul>

        <div v-else class="text-sm italic">Sound signature not derived yet</div>

    </div>


</div>

</template>

<script setup>
defineProps(['doc','signature'])
</script>