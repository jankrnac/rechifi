<template>

<div>

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