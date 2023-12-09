<template>

<div class="bg-gray-800 text-white py-24 mt-36 flex justify-center">
    <div class="flex flex-1 max-w-[1200px] gap-6 items-start">
        <table class="divide-gray-300 w-full mx-auto">
            <h2 class="text-2xl text-bold mb-6 w-full">Technical details</h2>

            <tbody class="divide-y divide-gray-600">
                
                <tr v-for="technical in technicals" :key=" Object.keys(technical)[0]">
                    <td class="whitespace-nowrap w-1 py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">{{ Object.keys(technical)[0] }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm">{{ Object.values(technical)[0] }}</td>

                </tr>
            </tbody>
        </table>

        <table class="divide-gray-300 w-full mx-auto">
            <h2 class="text-2xl text-bold mb-6">Package content</h2>
            <tbody class="divide-y divide-gray-600">
                <tr v-for="item in package" :key="item">
                    <td class="whitespace-nowrap w-1 py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">{{item }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>



</template>

<script setup>

    defineProps(['technicals','package'])

</script>