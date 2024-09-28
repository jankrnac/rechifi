<template>

<div class="max-w-app overflow-hidden relative">

    <template v-if="$device.isMobile">
        <Carousel :items-to-show="1">
			<Slide v-for="slide in [1,2,3]" :key="slide">
				<nuxt-img src="placeholder.webp" format="webp" sizes="480px" height="480px" densities="x1" fit="cover" class="rounded-lg"/>
			</Slide>
        </Carousel>
    </template>

    <template v-else>
        <Carousel :items-to-show="3" class="-m-1">
			<Slide v-for="(slide, index) in element.data.images" :key="slide">
				<div class="relative group m-1">
					<nuxt-img :src="slide" format="webp" sizes="480px" height="480px" densities="x1" fit="cover" class="rounded-lg"/>

					<div v-if="editable" class="group-hover:flex hidden absolute inset-0 opacity-90 flex-col space-y-2 flex-1 justify-center items-center">
						<UploadSingle @uploaded="imageChanged">
							<UButton @click="currentIndex = index">Change image</UButton>
						</UploadSingle>
						<UButton color="red" @click="deleteImage(index)">Delete image</UButton>
					</div>
					
				</div>
			</Slide>
		
            <template #addons>
                <Navigation />
                <Pagination />
            </template>
        </Carousel>
    </template>
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

	const currentIndex = ref()

	let imageChanges = {}

	const imageChanged = (data) => {
		props.element.data.images[currentIndex.value] = data.blob
		imageChanges[currentIndex.value] = data.form
		props.element.imageChanges = imageChanges
	}

	props.element.imageDeletions = []
	const deleteImage = (index) => {
		props.element.data.images.splice(index,1)
		props.element.imageDeletions.push(index)
	}


</script>
