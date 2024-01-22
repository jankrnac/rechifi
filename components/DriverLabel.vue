<template>
<div class="capitalize rounded-xl flex items-center justify-center font-semibold text-xs lg:text-lg"
    :class="{
        'border-orange-500': driver == 'DD',
        'border-green-500': driver == 'BA',
        'border-blue-500' : driver == 'Planar',
        'border-teal-500' :driver == 'EST',
        'px-4 py-2 text-sm border-4' : size == 'normal',
        'px-2 py-1 text-sm border-[3px]' : size == 'small'
    }"
>
    
    <div v-if="driver = 'DD'">
        Dynamic driver
    </div>

</div>

</template>

<script setup>

const slots = useSlots()

const props = defineProps({
    size: {
        default: 'normal'
    },
    driver: {
        type: String
    }
})

</script>