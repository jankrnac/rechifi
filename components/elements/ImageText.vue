<template>
    <div class="flex my-12 justify-evenly gap-12 items-center px-24" :class="{'flex-row-reverse':element.data.reversed}">

		<div class="basis-1/2 flex justify-center">
        	<nuxt-img :src="element.data.image" class="inline-block rounded-lg w-2/3" densities="x1"/>
			<UploadSingle v-if="editable" @uploaded="imageChanged" class="group-hover:flex hidden absolute inset-0 flex-col flex-1 justify-center items-center">
				<div class="bg-gray-100/80 px-4 py-2 rounded-lg">Click to change image</div>
        	</UploadSingle>	
		</div>

        <div class="basis-1/2 text-lg">
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
