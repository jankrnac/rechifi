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

    const nuxtApp = useNuxtApp()
    const updateAvailable = ref(false)

    nuxtApp.hook("app:manifest:update", () => {
        updateAvailable.value = true
    })
    

    onBeforeMount(() => {
        window.addEventListener("beforeunload", preventNav)
        onBeforeUnmount(() => {
            window.removeEventListener("beforeunload", preventNav);
        })
    })

    onBeforeRouteLeave((to, from, next) => {
        if (updateAvailable) {
            if (!window.confirm("Leave without saving?")) {
                return
            }
        }
        next();
    })

    const preventNav = (event) => {
        if (!updateAvailable) return
        event.preventDefault()
        event.returnValue = ""
    }

    
    const route = useRoute()

    const { data:article } = await useFetch(`/api/articles/${route.params.slug}`)

    const editable = ref(true)

    // update elements layout from Layout
    const updateLayout = async (data) => {
        article.value.elements = data
    }

    const save = () => {
        saveLayout(article)
    }

    // Extract sections elements for navigation (in Header element)
    const nav = article.value.elements.filter(e => e.type == 'section')

    const { save:saveLayout } = useLayout()

    provide('nav',nav)
    provide('user', article.value.user)
    provide('date', article.value.createdAt)



</script>