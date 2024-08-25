<template>

    <div class="max-w-app w-full mx-auto pb-24">

        <div v-show="editable" class="flex items-center gap-5 fixed left-0 z-[999]">
            <ElementsAvailable />
        </div>

        <Settings :editable="editable" />

        <Layout @change="updatePage" :elements="article.elements" :editable="editable" />

    </div>

</template>

<script setup>

    definePageMeta({
        middleware: ['auth', 'owner'],
    });

    const route = useRoute()

    const { data:article } = await useFetch(`/api/articles/${route.params.slug}`)

    const editable = ref(true)

    const updatePage = async (data) => {
        console.log(data)
        review.value.elements = data
    }

</script>