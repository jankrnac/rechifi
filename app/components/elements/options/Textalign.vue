<template>
<div class="flex gap-1">
    <UButton @click="change('text-left')" variant="outline" icon="i-ph-text-align-left" />
    <UButton @click="change('text-center')" variant="outline" icon="i-ph-text-align-center" />
    <UButton @click="change('text-right')" variant="outline" icon="i-ph-text-align-right" />

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