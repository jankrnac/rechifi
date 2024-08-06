<template>

<div class="flex flex-wrap justify-between mb-16 gap-1">
    <template v-for="letter in 26">
        <a :href="'#'+String.fromCharCode(letter+64).toLowerCase()" class="bg-gray-100 flex-1 py-2 flex min-w-[40px] justify-center hover:bg-orange-500 hover:text-white transition cursor-pointer rounded">{{ String.fromCharCode(letter+64) }}</a>
    </template>
</div>

</template>

<script setup>


 
</script>