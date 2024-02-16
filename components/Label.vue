<template>

    <div 
    
        class="relative z-10 inline-flex rounded-xl text-xs font-semibold px-3 py-1.5 text-gray-500 dark:bg-blue-900 dark:text-gray-300"
        :class="[
            $slots.default()[0].children  == 'IEM' ? 'bg-blue-200' : '',
            $slots.default()[0].children  == 'review' ? 'bg-orange-200' : '',
            $slots.default()[0].children  == 'news' ? 'bg-green-200' : '',
            $slots.default()[0].children  == 'DAP'  ? 'bg-teal-200' : '',
            $slots.default()[0].children  == 'DAC'  ? 'bg-red-200' : ''

        ]"
    >
        <slot />

    </div>

</template>

<script setup lang="ts">

const props = defineProps({

})

</script>