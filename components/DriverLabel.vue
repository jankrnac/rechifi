<template>
<div class="capitalize rounded-xl flex items-center justify-center font-semibold"
    :class="{
        'border-orange-500': slots.default()[0].children   == 'DD',
        'border-green-500' :slots.default()[0].children   == 'planar',
        'bg-gray-800 text-white' : slots.default()[0].children   == 'dark',
        'bg-orange-200' : slots.default()[0].children   == 'warm',
        'px-4 py-2 text-sm border-4' : size == 'normal',
        'px-2 py-1 text-sm border-[3px]' : size == 'small'
    }"
>

    <slot />
</div>

</template>

<script setup>

const slots = useSlots()

const props = defineProps({
    size: {
        default: 'normal'
    }
})

</script>