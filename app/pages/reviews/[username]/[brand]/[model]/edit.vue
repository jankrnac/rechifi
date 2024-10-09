<template>

    <div class="max-w-app w-full mx-auto pb-24">

        <div v-show="editable" class="flex items-center gap-5 fixed left-0 z-[999]">
            <ElementsAvailable />
        </div>

        <Settings 
            :post="review"
            :editable="editable"
            @save="save"
            @publish="publish"
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
    middleware: ['auth'],
});

const route = useRoute()

const editable = ref(true)

const { data:review } = await useFetch(`/api/reviews/${route.params.username}/${route.params.brand}/${route.params.model}`, {
    deep: true
})


const updateAvailable = ref(false)


onBeforeMount(() => {
    window.addEventListener("beforeunload", preventNav)
    onBeforeUnmount(() => {
        window.removeEventListener("beforeunload", preventNav);
    })
})

onBeforeRouteLeave((to, from, next) => {
    if (updateAvailable.value) {
        if (!window.confirm("Leave without saving?")) {
            return
        }
    }
    next();
})

const preventNav = (event) => {
    if (!updateAvailable.value) return
    event.preventDefault()
    event.returnValue = ""
}

const { save:saveLayout } = useLayout()


// update elements layout from Layout
const updateLayout = async (data) => {
    review.value.elements = data
}

const save = () => {
    saveLayout(review)
}

const publish = async (value) => {
    await $fetch('/api/posts/'+review.value.id, {
        method: "PUT",
        body: {
            published: value
        }
    })
}

// Extract sections elements for navigation (in Header element)
const nav = review.value.elements.filter(e => e.type == 'section')
provide('nav',nav)
provide('user', review.value.user)
provide('date', review.value.createdAt)



watch(review.value.elements, (value) => {
    updateAvailable.value = true
})



</script>