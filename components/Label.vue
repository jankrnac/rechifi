<template>

    <div 
        class="relative z-10 inline-flex rounded-xl text-xs font-semibold px-3 py-1.5 text-gray-500 dark:bg-blue-900 dark:text-gray-300"
        :class="[
            color == 'blue' ? 'bg-blue-100' : '',
            color == 'orange' ? 'bg-orange-100' : '',
            color == 'green' ? 'bg-green-200' : '',
            color == 'teal' ? 'bg-teal-200' : ''
        ]"
    >
        <slot />

    </div>

</template>

<script setup lang="ts">

const props = defineProps({
    color: {
        type: String,
        default: 'blue'
    }
})

</script>