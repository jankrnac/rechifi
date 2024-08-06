<template>

    <div class="w-screen bg-gray-800 text-white py-12 lg:py-24 lg:mt-36 lg:flex justify-center overflow-hidden">
        <div class="block md:flex flex-1 max-w-app gap-6 items-start justify-evenly flex-wrap">
            <div class="flex flex-col flex-1">
                <h2 class="text-xl font-bold text-center lg:text-left mb-6 w-full md:ml-0">Specifications</h2>
    
                <table class="divide-gray-300 ">
    
                    <tbody class="divide-y divide-gray-600">
                        
                        <tr v-for="spec in doc.specs" :key="Object.keys(spec)[0]">
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0 text-wrap w-[200px]">{{ Object.keys(spec)[0] }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-wrap">{{ Object.values(spec)[0] }}</td>
    
                        </tr>
                    </tbody>
                </table>
            </div>
    
    </div>
</div>

</template>

<script setup>

    defineProps(['doc'])

</script>