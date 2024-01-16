<template>
<div class="capitalize rounded-xl flex items-center justify-center font-semibold text-xs lg:text-sm"
    :class="{
        'border-orange-500': slots.default()[0].children.includes('DD'),
        'border-green-500' :slots.default()[0].children.includes('planar'),
        'border-blue-500' : slots.default()[0].children.includes('EST'),
        'border-teal-500' : slots.default()[0].children.includes('BA'),
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