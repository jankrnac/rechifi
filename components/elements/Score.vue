<template>

    <div class="flex justify-center">
        <div class="">{{ element.data.score }}</div>
        <div>/10</div>
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