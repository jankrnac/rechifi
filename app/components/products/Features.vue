<template>

<div class="bg-gray-50 dark:bg-gray-800 p-12 rounded-xl ring ring-offset-2 ring-gray-100 dark:ring-gray-700 dark:ring-offset-0">

        <div class="flex justify-center md:justify-start mb-8">
            <h2 class="text-xl font-bold">Features</h2>
        </div>

        <ul class="">
            <li v-for="feature in features" class="flex items-start mb-2 md:mb-1">
                <div class="mr-2 shrink-0">-</div>
                {{ feature }}
            </li>
        </ul>
    </div>

</template>

<script setup>

defineProps({
    features: {
        type: Array
    }
})

</script>