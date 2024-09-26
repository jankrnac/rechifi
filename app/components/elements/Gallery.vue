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
					<nuxt-img src="placeholder.webp" format="webp" sizes="480px" height="480px" densities="x1" fit="cover" class="rounded-lg"/>
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
