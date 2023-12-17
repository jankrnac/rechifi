<template>

<div class="max-w-app mx-auto">
    <div class="flex justify-between py-2 items-center">
        <div class="flex items-center gap-5">
            <ElementsAvailable />
        </div>
        <div class="flex items-center gap-5">
            <button class="bg-green-300 px-4 py-1.5 rounded-lg text-sm flex items-center cursor-pointer" @click="save">
                <IconsSave class="w-4 h-4 mr-2"/>
                Save
            </button>
            <div class="bg-gray-100 border px-4 py-1.5 rounded-lg text-sm flex items-center cursor-pointer">
                <IconsUpload class="w-4 h-4 mr-2"/>
                Publish
            </div>
        </div>
    </div>

    <Layout @change="updatePage" :elements="review.elements" :editable="true" />

</div>
</template>


<script setup>

const route = useRoute()
const client = useSupabaseClient()

const { data:review } = await useFetch('/api/reviews/layout', {
    method: "POST",
    body: {
        username: route.params.username,
        brand: route.params.brand,
        model: route.params.model,
    }
})

const updatePage = async (data) => {
    review.value.elements = data
}

const save = async () => {
    for (let [index, element] of review.value.elements.entries()) {

        // Newly added element  
        if (!Number.isInteger(element.id) && element.id.includes('new'))
        {
            await client.from('elements').insert({
                data: element.data,
                type: element.type,
                order: index
            })
        }

        //  Existing element
        if (Number.isInteger(element.id))
        {
            await client.from('elements').update({
                data: element.data,
                order: index
            }).eq('id', element.id)
        }
    }
}

</script>