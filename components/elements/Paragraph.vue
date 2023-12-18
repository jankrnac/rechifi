<template>
	<p :contenteditable="editable" :spellcheck="false" class="outline-none text-left" @input="update">{{element.data.text}}</p>
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
