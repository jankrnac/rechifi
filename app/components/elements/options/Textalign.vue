<template>
<div class="flex gap-1">
    <div class="p-2 border rounded" @click="change('text-left')"><IconsAlignLeft /></div>
    <div class="p-2 border rounded" @click="change('text-center')"><IconsAlignCenter /></div>
    <div class="p-2 border rounded" @click="change('text-right')"><IconsAlignRight /></div>

</div>
</template>

<script setup>

const emits = defineEmits(['change'])

const change = (data) => {
    emits('change', {
        type: 'textAlign',
        value: data
	})
}

</script>