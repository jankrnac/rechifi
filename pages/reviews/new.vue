<template>
 
<div class="max-w-app mx-auto">
    
    <div class="flex justify-between py-2 items-center">
        <ElementsAvailable />
        <div class="flex items-center gap-5">
            <div class="bg-green-300 px-4 py-1.5 rounded-lg text-sm flex items-center cursor-pointer" @click="save">
                <IconsSave class="w-4 h-4 mr-2"/>
                Save
            </div>
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

const updatePage = (data) => {
    page.value = data
}

const save = async () => {
    
    await useFetch('/api/pages', {
        method: "POST",
        body: page.value
    })

    await navigateTo('/reviews/' + result)
}



</script>