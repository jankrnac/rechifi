<template>

<div class="max-w-app w-full mx-auto">
    <div class="flex justify-between py-2 items-center">
        <div class="flex items-center gap-5">
            <ElementsAvailable />
        </div>
        <div class="flex items-center gap-5">
            <button class="relative bg-green-300 px-4 py-1.5 rounded-lg text-sm flex items-center cursor-pointer" @click="save">
                <template v-if="saving">
                    <div class="inset-0 rounded-lg absolute bg-green-300 flex justify-center items-center">
                        <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
                </template>
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

const activeElements = [...review.value.elements]

const updatePage = async (data) => {
    review.value.elements = data
}

const saving = ref(false)
const save = async () => {
    saving.value = true
    for (let [index, element] of review.value.elements.entries()) {

        // Newly added element  
        if (!Number.isInteger(element.id) && element.id.includes('new'))
        {
            await client.from('elements').insert({
                data: element.data,
                type: element.type,
                review_id: review.value.id,
                order: index
            })
        }

        // Existing element
        if (Number.isInteger(element.id))
        {
            await client.from('elements').update({
                data: element.data,
                order: index
            }).eq('id', element.id)
        }

        // Upload
        if(element.data.upload)
        {
            const { data:path } = await useFetch('/api/files', {
                method: 'POST',
                body: element.data.upload
            })

            element.data.image = path

            await client.from('elements').update({
                data: element.data,
            }).eq('id', element.id)
        }

    }

    // Deleting elements
    if(review.value.elements.length > 0)
    {
        activeElements.forEach(async (item) => {
            if(!review.value.elements.map(e => e.id).includes(item.id))
            {
                await client.from('elements').delete().eq('id', item.id)
            }
        })
    }
    else
    {
        activeElements.forEach(async (item) => {
            const element = await Element.findOrFail(item.id)
            await element.delete()
        })
    }

    saving.value = false
}

</script>