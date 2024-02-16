<template>
    <div class="max-w-app overflow-hidden relative mb-6">

    <template v-if="$device.isMobile">
        <Carousel :items-to-show="1">
            <Slide v-for="slide in element.data.images" :key="slide">
                <nuxt-img :src="slide" format="webp" sizes="480px" height="480px" densities="x1" fit="cover" class="rounded-lg"/>
            </Slide>
        </Carousel>
    </template>

    <template v-else>
        <Carousel :items-to-show="3">
            <Slide v-for="slide in  element.data.images" :key="slide">
                <nuxt-img :src="slide" format="webp" sizes="480px" height="480px" densities="x1" fit="cover" class="rounded-lg"/>
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

	const imageChanged = (data) => {
		props.element.data.image = data.blob
		props.element.data.upload = data.form
		props.element.data.uploadNeeded = true
	}


</script>
