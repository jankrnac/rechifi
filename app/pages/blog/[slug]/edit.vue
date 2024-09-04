<template>

    <div class="max-w-app w-full mx-auto pb-24">

        <div v-show="editable" class="flex items-center gap-5 fixed left-0 z-[999]">
            <ElementsAvailable />
        </div>

        <Settings 
            :post="article"
            :editable="editable"
            @save="save"
            @editableChanged="(data) => editable=data"
        />

        <Layout 
            :elements="article.elements" 
            :editable="editable" 
            @change="updateLayout"
        />

    </div>

</template>

<script setup>

    definePageMeta({
        middleware: ['auth', 'owner'],
    });

    const { save:saveLayout } = useLayout()
    
    const route = useRoute()

    const { data:article } = await useFetch(`/api/articles/${route.params.slug}`)

    const editable = ref(true)

    // update elements layout from Layout
    const updateLayout = async (data) => {
        article.value.elements = data
    }

    const save = () => {
        saveLayout(article, data)
    }

    // Extract sections elements for navigation (in Header element)
    const nav = article.value.elements.filter(e => e.type == 'section')


    provide('nav',nav)
    provide('user', article.value.user)
    provide('date', article.value.createdAt)



</script>