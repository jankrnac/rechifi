<template>

    <div class="mx-auto lg:mb-32 mb-16 lg:mt-16 grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-2 lg:grid-cols-3 lg:mx-0 lg:max-w-none xl:grid-cols-4">
        <template v-for="post in blogPosts.concat(reviews).sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))" :key="post._path">
            <BlogPostBox v-if="post._type == 'markdown'" :post="post" />
            <ReviewBox v-else :review="post"/>
        </template>
    </div>
    
</template>

<script setup>

    const client = useSupabaseClient()
  
    const { data:blogPosts } = await useAsyncData(() => queryContent('/blog')
        .sort({ created_at: -1 }) // show latest articles first
        .where({ _partial: false }) // exclude the Partial files
        .where({ visible: { $ne: false } })
        .where({ isHero: { $ne: true }  })
        .find() 
    )

    const { data:reviews } = await useAsyncData('reviews', async () => {
        const { data } = await client.from('reviews').select(`id, title, description, model, brand, slug, cover, type, created_at, published, profiles (username)`).eq('published', true).order('created_at')

        return data
    })

</script>