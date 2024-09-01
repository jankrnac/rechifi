<template>

<div class="flex flex-col items-center mb-32">
    <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-6">
        <span class="font-playfair">My articles </span>
        <span class="font-bold">& reviews</span> 
    </h1>	
    
	<UTabs :items="items" class="w-full flex flex-col items-center mt-6" :ui="{list: {base: 'flex justify-center max-w-[500px]'}}">
		<template #default="{ item, index }">
			<span v-if="index === 0" class="truncate">{{ item.label }} <UBadge size="xs" color="gray" variant="soft" class="ml-1">{{ data.filter(e=>e.type == 'article').length }}</UBadge></span>
			<span v-else class="truncate">{{ item.label }} <UBadge size="xs" color="gray" variant="soft"class="ml-1">{{ data.filter(e=>e.type == 'review').length }}</UBadge></span>
		</template>
		<template #item="{ item }">

		<div class="mx-auto lg:mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">

			<template v-if="item.key === 'articles'">
				<div v-for="article in data.filter(e=>e.type == 'article')" class="relative">

				<ArticleBox :post="article" />

				<!-- Review Options -->
				<div class="absolute top-0 right-0 space-x-1 z-[1]">
					<UButton size="xs" color="sky" :to="'/blog/'+article.slug+'/edit'" >Edit</UButton>
					<UButton size="xs" color="red" @click="deleteReview(review.id)">Delete</UButton>
				</div>
				</div>
			</template>

			<div v-if="item.key === 'reviews'" class="space-y-3">
				<div v-for="review in data.filter(e=>e.type == 'review')" class="relative">

				<ReviewBox :post="review" />

				<!-- Review Options -->
				<div class="absolute top-3 right-3 space-x-1 z-[1]">
					<UButton size="xs" color="sky" :to="1" >Edit</UButton>
					<UButton size="xs" color="red" @click="deleteReview(review.id)">Delete</UButton>
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