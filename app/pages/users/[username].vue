<template>

<div class="flex flex-col gap-12 mt-12 w-full max-w-app mb-24">
    <div class="flex flex-col items-center">
        <div>
            <div v-if="profile.avatar" class="flex w-24 h-24 mb-6 rounded-full overflow-hidden">
                <nuxt-img :src="profile.avatar.filename" densities="x1" sizes="200px md:300px lg:351px" class="min-h-full min-w-full flex-shrink-0 object-cover" />
            </div>
            <UIcon v-else name="i-ph-user-thin" size="72px" class="mb-8" />
        </div>
        <h1 class="font-bold text-3xl md:text-5xl ">{{ profile.username }}</h1>
    </div>
    <h2 class="font-bold text-2xl">Audio gear</h2>
        <ul class="grid grid-cols-2 gap-x-4 gap-y-2 md:gap-y-6 sm:grid-cols-3 sm:gap-x-2 lg:grid-cols-4 xl:gap-x-4" v-if="profile.usersToProducts.length > 0">
            <ProductBox v-for="iem in profile.usersToProducts.map(e=>e.product).filter(e=>e.type == 'iems')" :product="iem" />
            <ProductBox v-for="dap in profile.usersToProducts.map(e=>e.product).filter(e=>e.type == 'daps')" :product="dap" />
            <ProductBox v-for="dac in profile.usersToProducts.map(e=>e.product).filter(e=>e.type == 'dacs')" :product="dac" />
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

		<div class="mx-auto mt-8 lg:mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">

			<template v-if="item.key === 'articles'">
				<div v-for="article in profile.posts.filter(e=>e.type == 'article')" class="relative">

				<ArticleBox :post="article" />

				<!-- Review Options -->
				<div class="absolute top-0 right-0 space-x-1 z-[1]" v-if="user.id == profile.id">
					<UButton size="xs" color="sky" :to="'/blog/'+article.slug+'/edit'" >Edit</UButton>
					<UButton size="xs" color="red" @click="deletePost(article.id)">Delete</UButton>
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
					<UButton size="xs" color="sky" :to="'/reviews/'+profile.username+'/'+review.product.slug+'/edit'" >Edit</UButton>
					<UButton size="xs" color="red" @click="deletePost(review.id)">Delete</UButton>
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
        No posts
    </div>

    <UModal v-model="isOpen">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    Delete
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
                </div>
            </template>

            Are you sure you want to delete this?

            <template #footer>
                <div class="text-right">
                    <UButton @click="confirmDelete">Delete</UButton>
                </div>
            </template>
        </UCard>
    </UModal>

</div>

</template>

<script setup>

definePageMeta({
    middleware: 'auth'
});

const isOpen = ref(false)


const { user } = useUserSession()

const { data:profile } = await useFetch('/api/users/' + useRoute().params.username + '/profile')

const items = [{
  	key: 'articles',
  	label: 'Articles',
}, {
  key: 'reviews',
  label: 'Reviews',
}]


const deletedPostId = ref()

const deletePost = (id) => {
    deletedPostId.value = id

    isOpen.value = true
}

const confirmDelete = async () => {

    await $fetch(`/api/posts/${deletedPostId.value}`, {
        method: "DELETE"
    })

    profile.value.posts.splice(profile.value.posts.findIndex(e => e.id ===  deletedPostId.value), 1)

    isOpen.value = false
}


</script>