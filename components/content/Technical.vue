<template>

<div class="bg-gray-800 text-white py-24">
    <table class="divide-gray-300 w-[1200px] mx-auto">
        <h2 class="text-2xl text-bold mb-6">Technical details</h2>

        <tbody class="divide-y divide-gray-600">
            
            <tr v-for="technical in technicals" :key=" Object.keys(technical)[0]">
                <td class="whitespace-nowrap w-1 py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">{{ Object.keys(technical)[0] }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm">{{ Object.values(technical)[0] }}</td>

            </tr>
        </tbody>
    </table>

</div>



</template>

<script setup>

 defineProps(['technicals'])

</script>