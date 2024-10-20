<template>

<div class="w-full max-w-app">	

	<div class="flex justify-center items-center md:justify-start mb-8 gap-6">
		<UChip :text="product.posts.length" size="3xl" color="orange" :show="product.posts.length > 0"><h2 class="text-xl font-bold">Reviews</h2></UChip>
		<UButton v-if="user && product.posts.findIndex(e=>e.profile_id == user.id) < 0" size="sm" @click="addReview">Add review</UButton>
	</div>

	<template v-if="product.posts.length">

		<ul class="grid grid-cols-2 lg:grid-cols-5 gap-5">
			<li v-for="review in product.posts">
				<ReviewBox :post="review" size="small" />
			</li>
		</ul>

	</template>

	<template v-else>

		<div class="bg-gray-50 dark:bg-gray-800 p-10 flex justify-center rounded-xl text-xl font-thin">No reviews yet</div>

	</template>
	

</div>

</template>

<script setup>

const { user } = useUserSession()

const route = useRoute()

const props = defineProps({
	product: {
		type: Object,
		required: true
	}
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