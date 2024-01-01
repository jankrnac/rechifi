<template>

<div class="w-full">

	<div class="flex justify-between items-center mb-4">
		<h2 class="text-xl font-bold">Reviews ({{ reviews.length }})</h2>
		<ul class="flex gap-x-1 items-center">
			<li :class="{'bg-gray-800 text-white rounded-lg': activeTypeFilter == 'text'}" class="cursor-pointer px-3 py-0.5" @click="activeTypeFilter = 'text'">Websites</li>
			<li :class="{'bg-gray-800 text-white rounded-lg': activeTypeFilter == 'youtube'}" class="cursor-pointer px-3 py-0.5" @click="activeTypeFilter = 'youtube'">Youtube</li>
			<li :class="{'bg-gray-800 text-white rounded-lg': activeTypeFilter == 'people'}" class="cursor-pointer px-3 py-0.5" @click="activeTypeFilter = 'people'">People</li>
			<li :class="{'bg-gray-800 text-white rounded-lg': activeTypeFilter == 'all'}" class="cursor-pointer px-3 py-0.5" @click="activeTypeFilter = 'all'">All</li>

		</ul>
	</div>

	<template v-if="reviews.length">

	<ul class="grid grid-cols-5 gap-5">
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

const activeTypeFilter = ref('all')

const activeTypeFilterApi = computed(() => {
	if(activeTypeFilter.value == 'all') return [null]
	return activeTypeFilter.value
})

const { data:reviews } = await client.from('reviews').select('*, profiles(*)').eq('brand', route.params.brand).eq('model', route.params.model)

console.log(route.params.model)
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