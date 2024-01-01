<template>
    
<div class="max-w-app mx-auto flex-1 flex flex-col items-center justify-center">

    <h1 class="text-3xl font-bold mb-6">Choose IEM model</h1>

    <ModelCombobox v-if="!manualMode" v-model="headphone"/>
    <input v-else v-model="headphone" type="text" class="border rounded-lg px-5 py-4 w-[400px] text-sm" placeholder="Type the brand and model name"/>

    <div v-if="!manualMode" class="text-sm mt-2 text-gray-500 cursor-pointer" @click="manualMode = true">Item not in list. Enter manually</div>
    <div v-else class="text-sm mt-2 text-gray-500 cursor-pointer" @click="manualMode = false">Choose from list</div>

    <div class="mt-6 rounded-lg px-4 py-2 bg-green-700 text-white opacity-0 cursor-default hover:bg-green-800" :class="{'opacity-100 cursor-pointer':headphone}" @click="save">Next</div>

</div>

</template>

<script setup>


definePageMeta({
    middleware: 'auth'
});

const page = ref({})
const headphone = ref()

const updatePage = (data) => {
    page.value = data
}

const slugify = (string) => {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

const client = useSupabaseClient()
const user = useSupabaseUser()

const save = async () => {
    
    const slug = Math.random().toString(36).substring(2,9)

    if (headphone.value)
    {
        await client.from('reviews').insert({
            slug: slug,
            brand: slugify(headphone.value.brand),
            model: slugify(headphone.value.model),
            profile_id: user.value.id
        })

        const { data:profile } = await client.from('profiles').select().eq('id', user.value.id).single()

        await navigateTo(`/reviews/${profile.username}/${slugify(headphone.value.brand)}/${slugify(headphone.value.model)}`)
    }
}

const manualMode = ref(false)

</script>