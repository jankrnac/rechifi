<template>
    
<div class="max-w-app mx-auto">
    <div class="flex justify-between py-2 items-center">
        <div class="flex items-center gap-5">
            <ElementsAvailable />
            <ModelCombobox v-model="headphone"/>
        </div>
        <div class="flex items-center gap-5">
            <button class="bg-green-300 px-4 py-1.5 rounded-lg text-sm flex items-center cursor-pointer" @click="save" :disabled="!headphone" :class="{'opacity-50': !headphone}">
                <IconsSave class="w-4 h-4 mr-2"/>
                Save
            </button>
            <div class="bg-gray-100 border px-4 py-1.5 rounded-lg text-sm flex items-center cursor-pointer">
                <IconsUpload class="w-4 h-4 mr-2"/>
                Publish
            </div>
        </div>
    </div>

    <Layout @updated="updatePage"/>

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

    await client.from('reviews').insert({
        slug: slug,
        brand: slugify(headphone.value.brand),
        model: slugify(headphone.value.model),
        profile_id: user.value.id
    })   
       

    await navigateTo(`/reviews/${slugify(headphone.value.brand)}/${slugify(headphone.value.model)}/${slug}`)
}



</script>