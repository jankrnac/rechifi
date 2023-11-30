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

	<ul class="grid grid-cols-4 gap-5">
		<li v-for="review in reviews" class="relative flex flex-col items-center justify-center bg-gray-100/50 p-5 rounded-xl border hover:border-gray-200 transition border-transparent">
			<div v-if="review.type != 'youtube'" class="flex justify-center items-center">
				<div class="text-5xl font-bold">{{  review.score  }}</div>
				<div class="text-base font-bold mt-5 text-gray-500">/10</div>
			</div>

			<img v-if="review.type == 'youtube'" :src="`https://img.youtube.com/vi/${review.videoid}/mqdefault.jpg`" width="600" class="rounded-lg"/>

			<div v-if="review.type != 'youtube'" class="mt-4 text-sm line-clamp-4">{{ review.description }}</div>

			<a  v-if="review.type != 'youtube'" :href="review.link" target="_blank" class="absolute inset-0"></a>

			<div class="w-full mt-4 text-sm font-semibold">{{ review.reviewer }}</div>

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

const activeTypeFilter = ref('all')

const activeTypeFilterApi = computed(() => {
	if(activeTypeFilter.value == 'all') return ['text','youtube']
	return activeTypeFilter.value
})

const { data:reviews } = await useAsyncData('reviews',
    () => queryContent(`/reviews/${route.params.slug[0]}/${route.params.slug[1]}/`)
        .where({'type': { $in: activeTypeFilterApi.value}})
        .find(), {
			watch: [activeTypeFilterApi]
		}
)

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