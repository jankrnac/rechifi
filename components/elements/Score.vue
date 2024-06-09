<template>

<div class="mt-8">
	<h2 class="font-bold text-3xl mb-6">Rating</h2>

	<client-only>
      <ve-progress 
	  	:progress="element.data.score" 
		:size="150"
		font-size="2.5rem"
		:thickness="7"
		:empty-thickness="8"
		empty-line-mode="out"
		line-mode="out 5"
		dash="10 2"
		color="#88bedf"
		:legend-formatter="({ currentValue }) => `<span class='font-bold'>${currentValue}</span>`"
	/>
    </client-only>
</div>

</template>

<script setup>

	const props = defineProps({
		element: {
			type: Object
		},
		editable: {
			type: Boolean,
			default: false
		}
	})

</script>