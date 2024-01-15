<template>
    <div class="relative lg:mt-12" :class="[element.data.textAlign]">
		<div class="inline-block relative group max-w-[800px]">
        	<nuxt-img :src="element.data.image" class="inline-block rounded-lg" densities="x1" format="webp"/>
			<UploadSingle v-if="editable" @uploaded="imageChanged" class="group-hover:flex hidden absolute inset-0 flex-col flex-1 justify-center items-center">
				<div class="bg-gray-100/80 px-4 py-2 rounded-lg">Click to change image</div>
        	</UploadSingle>	
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

	const update = (e) => {
		emits('change', {
			type: 'text',
			value: e.target.innerText
		})
	}

	const imageChanged = (data) => {
		props.element.data.image = data.blob
		props.element.data.upload = data.form
		props.element.data.uploadNeeded = true
	}


</script>
