<template>
    
<div class="max-w-app mx-auto flex-1 flex flex-col items-center justify-center">

    <ul class="flex gap-6 lg:gap-12 mb-16">
        <li><IconsIem class="w-20 h-20 lg:w-32 lg:h-32 cursor-pointer" :class="[type == 'iem' ? 'opacity-100' : 'opacity-40']" @click="type = 'iem'"/></li>
        <li><IconsDap class="w-20 h-20 lg:w-32 lg:h-32 cursor-pointer" :class="[type == 'dap' ? 'opacity-100' : 'opacity-40']" @click="type = 'dap'" /></li>
        <li><IconsDac class="w-20 h-20 lg:w-32 lg:h-32 cursor-pointer" :class="[type == 'dac' ? 'opacity-100' : 'opacity-40']" @click="type = 'dac'" /></li>
    </ul>
    <h1 class="text-3xl font-bold mb-6">Choose {{ type }} model</h1>

    <ModelCombobox v-if="!manualMode" v-model="headphone"/>
    <input v-else v-model="headphone" type="text" class="border rounded-lg px-5 py-4 w-[400px] text-sm dark:bg-gray-800 dark:border-gray-600 focus:outline-none" placeholder="Type the brand and model name"/>

    <div v-if="!manualMode" class="text-sm mt-5 cursor-pointer flex items-center" @click="manualMode = true">Item not in list?
        <div class="border rounded ml-2 px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 transition">Enter manually</div>
    </div>
    <div v-else class="border rounded ml-2 px-2 py-0.5 hover:bg-gray-100 transition text-sm mt-5 cursor-pointer dark:hover:bg-gray-700 dark:border-gray-600" @click="manualMode = false">Choose from list</div>

    <div class="mt-6 rounded-lg px-4 py-2 bg-green-700 text-white opacity-0 cursor-default hover:bg-green-800" :class="{'opacity-100 cursor-pointer':headphone}" @click="save">Next</div>

</div>

</template>

<script setup>


definePageMeta({
    middleware: 'auth'
});

const page = ref({})
const headphone = ref()

const type = ref('iem')

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