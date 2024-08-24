<template>

<div class="flex flex-col items-center">
    <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-6">
        <span class="font-playfair">My articles </span>
        <span class="font-bold">& reviews</span> 
    </h1>	
    
	<UTabs :items="items" class="w-full flex flex-col items-center mt-6" :ui="{list: {base: 'flex justify-center max-w-[500px]'}}">
		<template #item="{ item }">

		<div class="mx-auto lg:mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">

			<div v-if="item.key === 'articles'" class="space-y-3">

			</div>

			<div v-if="item.key === 'reviews'" class="space-y-3">
				<div v-for="review in data" class="relative">

				<ReviewBox :review="review" />

				<!-- Review Options -->
				<div class="absolute top-12 right-3 z-[1]">
					<Button size="small" color="red" class="absolute" @click="deleteReview(review.id)">Delete</Button>
				</div>
				</div>
			</div>
		</div>
		</template>
	</UTabs>

       

</div>

</template>

<script setup>

definePageMeta({
    middleware: 'auth'
});

const { user } = useUserSession()


const { data } = await useFetch('/api/users/' + user.value.id)

const deletedReviewId = ref()

const deleteReview = (id) => {
    openModal()

    deletedReviewId.value = id
}

const confirmDelete = async () => {

    await client.from('reviews').delete().eq('id', deletedReviewId.value)

    reviews.value.splice(reviews.value.findIndex(e => e.id ===  deletedReviewId.value), 1)

    closeModal()
}




const items = [{
  	key: 'articles',
  	label: 'Articles',
}, {
  key: 'reviews',
  label: 'Reviews',
}]

</script>