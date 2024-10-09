<template>

    <PostPage :post="article" />
    
</template>
    
<script setup>
      defineOgImageComponent('NuxtSeo')

    const route = useRoute()

    const { data:article } = await useFetch(`/api/articles/${route.params.slug}`)
            
    useSeoMeta
    ({
        title: article.value.title + ' - Rechifi',
        ogTitle: article.value.title + ' - Rechifi',
        description: article.value.description,
        ogDescription: article.value.description,
        ogImage: article.value.cover,
    })

    // Extract sections elements for navigation (in Header element)
    const nav = article.value.elements.filter(e => e.type == 'section')

    provide('nav', nav)
    provide('user', article.value.user)
    provide('date', article.value.createdAt)

    const title = useState('title', () => article.value.title)

    const publish = async (value) => {
        const { error } = await client.from('reviews').update({
            'published': value
        }).eq('id', review.value.id)

        if(!error) review.value.published = value
        
    }

</script>