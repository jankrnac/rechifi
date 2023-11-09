<template>

<div class="flex w-full justify-evenly">
    <ul class="mt-12">
        <li v-for="stat in stats" class="flex justify-end">
            <div class="capitalize">{{ Object.keys(stat)[0] }} : </div>
            <div class="font-semibold w-[35px] text-right mr-1">{{ Object.values(stat)[0] }}</div>
            <div class="text-gray-600"> / 10</div>
        </li>
    </ul>

    <div class="justify-center items-center flex">
        <div class="text-7xl font-bold py-6 px-8 bg-orange-600 rounded-xl text-white shine relative">S</div>
    </div>

</div>

</template>

<script setup>

    defineProps(['stats'])

</script>
