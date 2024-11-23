<template>

<PostPage :post="review" />

</template>

<script setup>

    const route = useRoute()

    const { data:review } = await useFetch(`/api/reviews/${route.params.username}/${route.params.brand}/${route.params.model}`, {
        deep: true
    })
        
    useSeoMeta
    ({
        title: route.params.username + `'s ` + review.value.title + ' review',
        ogTitle: route.params.username + `'s ` + review.value.title + ' review',
        description: review.value.description,
        ogDescription: review.value.description,
        ogImage: review.value.cover,
    })

    // Extract sections elements for navigation (in Header element)
    const nav = review.value.elements.filter(e => e.type == 'section')
    provide('nav',nav)
    provide('user', review.value.user)

    provide('date', review.value.createdAt)
    const title = useState('title', () => review.value.title)

    
    const publish = async (value) => {
        const { error } = await client.from('reviews').update({'published': value}).eq('id', review.value.id)

        if(!error) review.value.published = value
        
    }
</script>