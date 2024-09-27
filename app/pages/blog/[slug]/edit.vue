<template>

    <div class="max-w-app w-full mx-auto pb-24">

        <div v-show="editable" class="flex items-center gap-5 fixed left-0 z-[999]">
            <ElementsAvailable />
        </div>

        <Settings 
            :post="article"
            :editable="editable"
            @save="save"
            @publish="publish"
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

    
    const route = useRoute()

    const { data:article } = await useFetch(`/api/articles/${route.params.slug}`)
    const activeElements = [...article.value.elements]

    const editable = ref(true)

    // update elements layout from Layout
    const updateLayout = async (data) => {
        article.value.elements = data

    }

    const save = () => {
        saveLayout(article, activeElements)
    }

    const publish = async (value) => {
        await $fetch('/api/posts/'+article.value.id, {
            method: "PUT",
            body: {
                published: value
            }
        })
    }

    // Extract sections elements for navigation (in Header element)
    const nav = article.value.elements.filter(e => e.type == 'section')

    const { save:saveLayout } = useLayout()

    const updateTitle = (value) => {
        article.value.title = value
    }

    const title = useState('title', () => article.value.title)

    provide('nav',nav)
    provide('user', article.value.user)
    provide('date', article.value.createdAt)

    watch(() => article.value.elements, (value) => {
        updateAvailable.value = true
    })

</script>