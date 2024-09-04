<template>

    <div class="max-w-app w-full mx-auto pb-24">

        <div v-show="editable" class="flex items-center gap-5 fixed left-0 z-[999]">
            <ElementsAvailable />
        </div>

        <Settings 
            :post="review"
            :editable="editable"
            @save="save"
            @editableChanged="(data) => editable=data"
        />

        <Layout 
            :elements="review.elements" 
            :editable="editable" 
            @change="updateLayout"
        />

    </div>

</template>



<script setup>

definePageMeta({
    middleware: ['auth', 'owner'],
});

const route = useRoute()

const editable = ref(true)

const { data:review } = await useFetch(`/api/reviews/${route.params.username}/${route.params.brand}/${route.params.model}`, {
        deep: true
})


// update elements layout from Layout
const updateLayout = async (data) => {
    console.log(data)
    article.value.elements = data
}

// master save from Settings
const save = async (data) => {

}

// Extract sections elements for navigation (in Header element)
const nav = review.value.elements.filter(e => e.type == 'section')
provide('nav',nav)


const updatePage = async (data) => {
    console.log(data)
    review.value.elements = data
}

const saving = ref(false)



provide('date', review.value.created_at)




</script>