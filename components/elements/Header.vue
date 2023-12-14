<template>
	<h1 class="mb-5 text-xl font-semibold outline-none">
		<span :contenteditable="editable" :spellcheck="false">{{element.data.text.value}}</span>
	</h1>
</template>

<script setup>

	const props = defineProps({
		element: {
			type: Object
		}
	})

	const editable = ref(true)

</script>
