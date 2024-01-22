<template>

<div class="w-full">

	<div class="flex justify-between items-center mb-8">
		<h2 class="text-xl font-bold">Reviews ({{ reviews.length }})</h2>
	</div>

	<template v-if="reviews.length">

	<ul class="grid grid-cols-2 lg:grid-cols-5 gap-5">
		<li v-for="review in reviews">
			<ReviewBox :review="review" size="small" />
		</li>
	</ul>

	</template>

	<template v-else>

		<div class="bg-gray-50 p-10 flex justify-center rounded-xl text-xl font-thin">No reviews yet</div>

	</template>


</div>

</template>

<script setup>

const route = useRoute()
const client = useSupabaseClient()


const { data:reviews } = await client.from('reviews').select('*, profiles(*)').eq('brand', route.params.brand).eq('model', route.params.model)

const { t } = useI18n({
    useScope: 'local'
})

</script>

<i18n lang="yaml">
    en:
     reviews: 'Reviews'
    cz:
     reviews: 'Recenze'

</i18n>