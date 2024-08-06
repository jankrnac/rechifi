<template>
    <div class="flex flex-col lg:flex-row my-12 justify-between gap-6 lg:gap-24 items-center lg:px-24" :class="{'flex-row-reverse':element.data.reversed}">

		<div class="basis-1/2 flex justify-center">
        	<ElementsImage :element="element" :editable="editable"/>
		</div>

        <div class="basis-1/2">
            <ElementsParagraph :element="element" :editable="editable" @change="update"/>
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

	const emits = defineEmits(['change'])

	const update = (data) => {
		emits('change', data)
    }

	const imageChanged = (data) => {
		props.element.data.image = data.blob
		props.element.data.upload = data.form
		props.element.data.uploadNeeded = true
	}


</script>
