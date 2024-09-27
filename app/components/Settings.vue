<template>

<div>
    <div class="flex justify-end lg:justify-between py-2 items-center">
        <div class="flex gap-2">
            <UButton color="orange" @click="$emit('editableChanged', !editable)">
                <template #leading>
                    <UIcon name="i-ph-eye" v-if="editable" />
                    <UIcon name="i-ph-pencil-simple" v-else />
                </template>

                <span v-if="editable">Preview</span>
                <span v-else>Edit</span>
            </UButton>

            <UButton  @click="settingsVisible = !settingsVisible" icon="i-ph-gear">
                <span class="hidden lg:inline">Settings</span>
            </UButton>
        </div>
        <div class="flex items-center gap-2">
            <UButton v-show="editable" :disabled="loading" :loading="loading" color="green" @click="save()" label="Save" icon="i-ph-download-simple-light"/>
            
            <UButton v-if="local.published" v-show="editable" color="red" :loading="loadingPublish" icon="i-ph-eye-closed" @click="publish(false)" >
                Unpublish
            </UButton>
            <UButton v-else v-show="editable" :loading="loadingPublish" icon="i-ph-upload-simple" @click="publish(true)" >
                Publish
            </UButton>
        </div>
    </div> 

    
    <!-- Settings -->
    <div v-if="settingsVisible && editable" class="border dark:border-gray-700 rounded-lg p-6 mb-6">
        <div class="flex gap-5">
            <div>
                <div class="mb-2 font-semibold text-sm">Cover</div>
                <div class="relative w-[300px] h-[300px] group overflow-hidden rounded-lg">
                    <nuxt-img :src="local.cover ? local.cover.filename : 'placeholder.webp'" width="300" height="300" class="rounded-lg group" fit="contain"/>

                    <UploadSingle @uploaded="coverChanged" class="group-hover:flex hidden absolute inset-0 flex-col flex-1 justify-center items-center">
                        <div class="bg-gray-100/80 px-4 py-2 rounded-lg">Click to change image</div>
                    </UploadSingle>	       
                </div>
            </div>

            <div class="flex flex-col w-full max-w-[500px]">
                <div class="text-sm font-semibold mb-2">Title</div>
                <UInput v-model="local.title"/>

                <div class="text-sm font-semibold my-2">Slug</div>
                <UInput v-model="local.slug" disabled />

                <div class="text-sm font-semibold mt-4 mb-2">Description</div>
                <UTextarea type="text" v-model="local.description" rows="6"></UTextarea>
            </div>

            <div class="flex flex-col flex-1 items-center justify-center">
                <div class="text-sm font-semibold mb-12">Article type and associated gear</div>

                <ul class="flex gap-6 lg:gap-12 justify-center">
                    <li><IconsIem class="w-20 h-20 cursor-pointer" :class="[local.gearType == 'iem' ? 'opacity-100' : 'opacity-40']" @click="local.gearType  = 'iem'"/></li>
                    <li><IconsDap class="w-20 h-20 cursor-pointer" :class="[local.gearType  == 'dap' ? 'opacity-100' : 'opacity-40']" @click="local.gearType  = 'dap'" /></li>
                    <li><IconsDac class="w-20 h-20 cursor-pointer" :class="[local.gearType  == 'dac' ? 'opacity-100' : 'opacity-40']" @click="local.gearType  = 'dac'" /></li>
                </ul>

                <ul class="mb-12">
                    <li v-for="error in errors" class="bg-red-100 rounded-lg px-5 py-4">
                        {{ error }}
                    </li>
                </ul>

        <h1 class="text-3xl font-bold mb-6">Choose {{ local.gearType }} model</h1>

        <ModelCombobox v-if="!manualMode && local.gearType" v-model="headphone" :model="local.gearType" />

        <div v-else-if="local.gearType" class="mt-6">
            <div class="font-semibold">Brand</div>
            <input v-model="brand" type="text" class="border rounded-lg px-5 py-4 w-[400px] text-sm dark:bg-gray-800 dark:border-gray-600 focus:outline-none" placeholder="Type the brand and model name"/>

            <div class="font-semibold mt-6">Model</div>
            <input v-model="model" type="text" class="border rounded-lg px-5 py-4 w-[400px] text-sm dark:bg-gray-800 dark:border-gray-600 focus:outline-none" placeholder="Type the brand and model name"/>

        </div>

        <div v-if="!manualMode" class="text-sm mt-5 cursor-pointer flex items-center" @click="manualMode = true">Item not in list?
            <div class="border rounded ml-2 px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 transition">Enter manually</div>
        </div>
        <div v-else class="border rounded ml-2 px-2 py-0.5 hover:bg-gray-100 transition text-sm mt-5 cursor-pointer dark:hover:bg-gray-700 dark:border-gray-600" @click="manualMode = false">Choose from list</div>

            </div>
        </div>
    </div>
</div>
</template>

<script setup>

const props = defineProps(['editable','post'])
const local = ref(props.post)
const title = useState('title')

const loading = ref(false)

const settingsVisible = ref(false)

const emit = defineEmits(['save','editableChanged', 'publish'])

const coverChanged = (data) => {
    local.value.cover = {
        filename: data.blob
    }
    local.value.upload  = data.form
    local.value.uploadNeeded = true
}

watch(() => local.value.title, (value) =>
    {
        local.value.slug = useSlug(value)
        title.value = value
    }
, {
    deep: true
})

const save = () => {
    loading.value = true
    emit('save', local.value)

    setTimeout(() => {
        loading.value = false
    },400)
}

const loadingPublish = ref(false)

const publish = (value) => {
    loadingPublish.value = true
    emit('publish', value)

    setTimeout(() => {
        loadingPublish.value = false
        local.value.published = value

    },400)

}

const manualMode = ref(false)
const headphone = ref()

const brand = ref()
const model = ref()

const errors = ref([])

</script>