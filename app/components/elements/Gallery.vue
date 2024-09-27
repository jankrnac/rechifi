<template>

<div class="max-w-app overflow-hidden relative">

    <template v-if="$device.isMobile">
        <Carousel :items-to-show="1">
			<template v-if="element.data.images.length">
				<Slide v-for="slide in element.data.images" :key="slide">
					<nuxt-img :src="slide" format="webp" sizes="480px" height="480px" densities="x1" fit="contain" class="rounded-lg"/>
				</Slide>
			</template>

			<template v-else>
				<Slide v-for="slide in [1,2,3]" :key="slide">
					<nuxt-img src="placeholder.webp" format="webp" sizes="480px" height="480px" densities="x1" fit="cover" class="rounded-lg"/>
				</Slide>
			</template>
        </Carousel>
    </template>

    <template v-else>
        <Carousel :items-to-show="3">
			<template v-if="element.data.images.length">
				<Slide v-for="slide in element.data.images" :key="slide">
					<nuxt-img :src="slide" format="webp" sizes="480px" height="480px" densities="x1" fit="contain" class="rounded-lg mr"/>
				</Slide>
			</template>

			<template v-else>
				<Slide v-for="slide in [1,2,3]" :key="slide">
					<div class="relative group">
						<nuxt-img src="placeholder.webp" format="webp" sizes="480px" height="480px" densities="x1" fit="cover" class="rounded-lg"/>

						<UploadSingle v-if="editable" @uploaded="imageChanged" class="group-hover:flex hidden absolute inset-0 flex-col flex-1 justify-center items-center">
							<div class="bg-gray-100/80 dark:bg-gray-900/50 px-4 py-2 rounded-lg">Click to change image</div>
						</UploadSingle>	
					</div>

				</Slide>
			</template>
			
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

	const imageChanged = (data) => {
		props.element.data.image = data.blob
		props.element.data.upload = data.form
		props.element.data.uploadNeeded = true
	}


</script>
