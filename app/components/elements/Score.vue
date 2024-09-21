<template>

<div class="lg:mt-8">
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
		:legend-formatter="myFormatter"
	/>
    </client-only>

	<div v-if="editable" class="w-[400px] mx-auto my-8">
		<URange v-model="element.data.score" :min="0" :max="100" />
	</div>

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

	const myFormatter = ({ currentValue }) => {
     return `
        <span class="font-bold">${currentValue}</span>
      `;
    }
</script>