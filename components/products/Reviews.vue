<template>

<div class="w-full mb-36">	

	<div class="flex justify-center items-center md:justify-start mb-8 gap-4">
		<h2 class="text-xl font-bold">Reviews</h2>
		<div v-if="user && reviews.findIndex(e=>e.profile_id == user.id) < 0" class="bg-blue-200 rounded text-sm px-2 py-1 cursor-pointer" @click="addReview">Add review</div>
	</div>

	<template v-if="reviews.length">

	<ul class="grid grid-cols-2 lg:grid-cols-5 gap-5">
		<li v-for="review in reviews">
			<ReviewBox :review="review" size="small" />
		</li>
	</ul>

	</template>

	<template v-else>

		<div class="bg-gray-50 dark:bg-gray-800 p-10 flex justify-center rounded-xl text-xl font-thin">No reviews yet</div>

	</template>
	

</div>

</template>

<script setup>

const route = useRoute()
const client = useSupabaseClient()
const user = useSupabaseUser()

const { data:reviews } = await client.from('reviews').select('*, profiles(*)').eq('brand', route.params.brand).eq('model', route.params.model)


const { t } = useI18n({
    useScope: 'local'
})

const addReview = async () => {

	const slug = Math.random().toString(36).substring(2,9)

	const brandPayload =  useSlug(route.params.brand)
	const modelPayload = useSlug(route.params.model)

	await client.from('reviews').insert({
		slug: slug,
		brand: brandPayload,
		model: modelPayload,
		type: useRoute().path.split('/')[1].slice(0, -1),
		profile_id: user.value.id
	})
	


	await navigateTo(`/reviews/${profile.username}/${brandPayload}/${modelPayload}/edit`)
}

</script>

<i18n lang="yaml">
    en:
     reviews: 'Reviews'
    cz:
     reviews: 'Recenze'

</i18n>