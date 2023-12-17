<template>
	<h1 class="mb-5 text-xl font-semibold">
		<span :contenteditable="editable" :spellcheck="false" class="outline-none" @input="update">{{element.data.text}}</span>
	</h1>
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

	const emits = defineEmits(['change'])

	const update = (e) => {
		emits('change', {
			type: 'text',
			value: e.target.innerText
		})
	}


</script>
