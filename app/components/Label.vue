<template>

    <UBadge 
    
        :color="[
            $slots.default()[0].children  == 'IEM' ? 'bg-blue-200 dark:bg-blue-900' : '',
            $slots.default()[0].children  == 'review' ? 'bg-orange-200 dark:bg-orange-900' : '',
            $slots.default()[0].children  == 'article' ? 'sky' : 'sky',
            $slots.default()[0].children  == 'DAP'  ? 'bg-teal-200 dark:bg-teal-900' : '',
            $slots.default()[0].children  == 'DAC'  ? 'bg-red-200 dark:bg-red-900' : ''

        ]"
    >
        <slot />

    </UBadge>

</template>

<script setup lang="ts">

const props = defineProps({

})

</script>