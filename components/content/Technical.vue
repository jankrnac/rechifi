<template>

<div class="bg-gray-800 text-white py-12 lg:py-24 lg:mt-36 flex justify-center -mx-4 md:mx-0 overflow-hidden">
    <div class="block md:flex flex-1 max-w-app gap-6 items-start justify-evenly flex-wrap">
        <div class="flex flex-col flex-1">
            <h2 class="text-2xl text-bold mb-6 w-full ml-4 md:ml-0">Technical details</h2>

            <table class="divide-gray-300 ">

                <tbody class="divide-y divide-gray-600">
                    
                    <tr v-for="technical in technicals" :key="Object.keys(technical)[0]">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0 text-wrap w-[200px]">{{ Object.keys(technical)[0] }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-wrap">{{ Object.values(technical)[0] }}</td>

                    </tr>
                </tbody>
            </table>
        </div>

        <div class="flex flex-col flex-1 mt-12 lg:mt-0">
            <h2 class="text-2xl text-bold mb-6 ml-4 lg:ml-0">Package content</h2>

            <table class="divide-gray-300">
                <tbody class="divide-y divide-gray-600">
                    <tr v-for="item in package" :key="item">
                        <td class="whitespace-nowrap w-1 py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">{{ item }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>



</template>

<script setup>

    defineProps(['technicals','package'])

</script>