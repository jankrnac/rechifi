<template>

<div class="flex flex-col gap-12 mt-12 w-full max-w-app mb-24">
    <div class="flex flex-col items-center">
        <div>
            <nuxt-img v-if="user.avatar" :src="user.avatar.filename" width="100px" class="mb-12" />
            <Icon v-else name="ph:user-thin" class="w-24 h-24 mb-8" />
        </div>
        <h1 class="font-bold text-5xl ">{{ user.username }}</h1>
    </div>
    <h2 class="font-bold text-2xl">Audio gear</h2>
        <ul class="grid grid-cols-5 gap-2" v-if="iems.length + daps.length + dacs.length > 0">
            <ProductBox v-for="iem in iems" :product="iem" />
            <ProductBox v-for="dap in daps" :product="dap" />
            <ProductBox v-for="dac in dacs" :product="dac" />
        </ul>
        <div v-else class="text-xl font-light">
            No gear
        </div>
    <h2 class="font-bold text-2xl">Posts</h2>
    
    <template v-if="profile.posts && profile.posts.length">
	<UTabs :items="items" class="w-full flex flex-col items-center mt-6" :ui="{list: {base: 'flex justify-center max-w-[500px]'}}">
		<template #default="{ item, index }">
			<span v-if="index === 0" class="truncate">{{ item.label }} <UBadge size="xs" color="gray" variant="soft" class="ml-1">{{ profile.posts.filter(e=>e.type == 'article').length }}</UBadge></span>
			<span v-else class="truncate">{{ item.label }} <UBadge size="xs" color="gray" variant="soft"class="ml-1">{{ profile.posts.filter(e=>e.type == 'review').length }}</UBadge></span>
		</template>
		<template #item="{ item }">

		<div class="mx-auto lg:mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">

			<template v-if="item.key === 'articles'">
				<div v-for="article in profile.posts.filter(e=>e.type == 'article')" class="relative">

				<ArticleBox :post="article" />

				<!-- Review Options -->
				<div class="absolute top-0 right-0 space-x-1 z-[1]" v-if="user.id == profile.id">
					<UButton size="xs" color="sky" :to="'/blog/'+article.slug+'/edit'" >Edit</UButton>
					<UButton size="xs" color="red" @click="deleteReview(review.id)">Delete</UButton>
				</div>

                <div v-if="!article.published" class="absolute inset-0 -mt-12 flex justify-center items-center opacity-65">
                    <UBadge color="red">Unpublished</UBadge>
                </div>
				</div>
			</template>

			<div v-if="item.key === 'reviews'" class="space-y-3">
				<div v-for="review in profile.posts.filter(e=>e.type == 'review')" class="relative">

				<ReviewBox :post="review" />

				<!-- Review Options -->
				<div class="absolute top-0 right-0 space-x-1 z-[1]"  v-if="user.id == profile.id">
					<UButton size="xs" color="sky" :to="'/reviews/'+profile.username+'/'+review.brand+'/'+review.model+'/edit'" >Edit</UButton>
					<UButton size="xs" color="red" @click="deleteReview(review.id)">Delete</UButton>
				</div>

                <div v-if="!review.published" class="absolute inset-0 -mt-12 flex justify-center items-center opacity-65">
                    <UBadge color="red">Unpublished</UBadge>
                </div>

				</div>
			</div>
		</div>
		</template>
	</UTabs>
    </template>

    <div v-else class="text-xl font-light">
        No gear
    </div>


</div>

</template>

<script setup>

definePageMeta({
    middleware: 'auth'
});
const { user } = useUserSession()

const { data:profile } = await useFetch('/api/users/' + useRoute().params.username + '/profile')

const items = [{
  	key: 'articles',
  	label: 'Articles',
}, {
  key: 'reviews',
  label: 'Reviews',
}]


const { data:iems } = await useAsyncData( async () =>  
{   
    const iems = []

    if(profile.value.iems && profile.value.iems.length)
    {
        for (const iem of profile.value.iems)
        {
            iems.push(await queryContent(iem).findOne())
        }
    }

    return iems

})

const { data:daps } = await useAsyncData( async () =>  
{           const daps = []

    if(profile.value.daps && profile.value.daps.length)
    {
        for (const dap of profile.value.daps)
        {
            daps.push(await queryContent(dap).findOne())
        }

    }

    return daps

})


const { data:dacs } = await useAsyncData( async () =>  
{           const dacs = []

    if(profile.value.dacs && profile.value.dacs.length)
    {
        for (const dac of profile.dacs)
        {
            dacs.push(await queryContent(dac).findOne())
        }

    }

    return dacs

})

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


</script>