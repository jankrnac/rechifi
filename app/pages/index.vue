<template>


    <div class="w-full max-w-app mt-6 mb-12 lg:my-12">   

        <Hero />
        
        <div class="mx-auto lg:mb-32 mb-16 lg:mt-16 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-y-20 md:grid-cols-2 lg:grid-cols-3 lg:mx-0 lg:max-w-none xl:grid-cols-4">

            <template v-for="post in data">
                <ArticleBox v-if="post.type == 'article'" :post="post" class="col-span-2 md:col-span-1"/>
                <ReviewBox v-else-if="post.type == 'review'" :post="post"/>
                <ProductPostBox v-else :product="post"/>
            </template>
        </div>

        
        <div class="mt-8 md:mt-24 flex justify-center">
            <UIcon name="i-ph-arrow-circle-down-thin" size="48px" class="cursor-pointer" @click="loadMore" />
        </div>

    </div>


</template>

<script setup>


useSeoMeta({
    title: 'Chi-fi user articles and reviews',
    description: `Collection of Chi-fi audio news and user reviews all created by users, for users. Explore reviews, comparisons, and user insights to find the perfect audio companion for your 
    unique preferences. In the ever-changing world of Chi-Fi, one can easily become lost. But fear not, Rechifi is all you need to stay informed and make the best decisions to fully satisfy 
    your audiophile needs.`
})

const page = ref(1)

const { data:posts, refresh } = await useAsyncData(() => {

    const data = $fetch(`/api/posts/all`, {
        query: {
            'page': page.value,
        }
    })

    return data
})

// help variable for infinite scroll
const data = ref()
data.value = posts.value

const loadMore = async () => {
    page.value++

    await refresh()

    data.value = [...data.value, ...posts.value]
}

</script>