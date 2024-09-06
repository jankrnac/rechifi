<template>

<div>
    <div class="flex justify-end lg:justify-between py-2 items-center">
        <div class="flex gap-2">
            <UButton color="orange" @click="$emit('editableChanged', !editable)">
                <template #leading>
                    <UIcon name="i-ph-eye-light" v-if="editable" />
                    <UIcon name="i-ph-pencil-simple-light" v-else />
                </template>

                <span v-if="editable">Preview</span>
                <span v-else>Edit</span>
            </UButton>

            <div class="mr-2 bg-blue-300 px-4 py-1.5 rounded-lg text-sm flex items-center cursor-pointer" @click="settingsVisible = !settingsVisible">
                <Icon name="ph:gear-thin" class="w-4 h-4 lg:mr-2"/>
                <span class="hidden lg:inline">Settings</span>
            </div>
        </div>
        <div class="flex items-center gap-2">
           
            <UButton v-show="editable" :loading="loading" color="green" @click="save()" label="Save" icon="i-ph-download-simple-light"/>
            
            <div v-show="editable" class="bg-gray-100 px-4 py-1.5 rounded-lg flex items-center cursor-pointer">
                <Icon name="ph:upload-simple" class="w-4 h-4 lg:mr-2"/>
                <span class="hidden lg:inline">Publish</span>
            </div>
        </div>
    </div> 

    
    <!-- Settings -->
    <div v-if="settingsVisible && editable" class="border rounded-lg p-6 mb-6">
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
                <input type="text" v-model="local.title" class="border rounded-lg px-4 py-2"/>

                <div class="text-sm font-semibold my-2">Slug</div>
                <input type="text" v-model="local.slug" disabled class="border rounded-lg px-4 py-2"/>

                <div class="text-sm font-semibold mt-4 mb-2">Description</div>
                <textarea type="text" v-model="local.description" class="border rounded-lg px-4 py-2 resize-none h-full text-sm"></textarea>
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

        <h1 class="text-3xl font-bold mb-6">Choose {{ type }} model</h1>

        <ModelCombobox v-if="!manualMode" v-model="headphone" :model="type" />

        <div v-else class="mt-6">
            <div class="font-semibold">Brand</div>
            <input v-model="brand" type="text" class="border rounded-lg px-5 py-4 w-[400px] text-sm dark:bg-gray-800 dark:border-gray-600 focus:outline-none" placeholder="Type the brand and model name"/>

            <div class="font-semibold mt-6">Model</div>
            <input v-model="model" type="text" class="border rounded-lg px-5 py-4 w-[400px] text-sm dark:bg-gray-800 dark:border-gray-600 focus:outline-none" placeholder="Type the brand and model name"/>

        </div>

        <div v-if="!manualMode" class="text-sm mt-5 cursor-pointer flex items-center" @click="manualMode = true">Item not in list?
            <div class="border rounded ml-2 px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 transition">Enter manually</div>
        </div>
        <div v-else class="border rounded ml-2 px-2 py-0.5 hover:bg-gray-100 transition text-sm mt-5 cursor-pointer dark:hover:bg-gray-700 dark:border-gray-600" @click="manualMode = false">Choose from list</div>

        <div class="mt-6 rounded-lg px-4 py-2 bg-green-700 text-white opacity-0 cursor-default hover:bg-green-800" :class="{'opacity-100 cursor-pointer':headphone || (model && brand)}" @click="save">Next</div>

            </div>
        </div>
    </div>
</div>
</template>

<script setup>

const props = defineProps(['editable','post'])
const local = ref(props.post)

const loading = ref(false)

const settingsVisible = ref(false)

const emit = defineEmits(['save','editableChanged'])

const coverChanged = (data) => {
    local.value.cover = {
        filename: data.blob
    }
    local.value.upload  = data.form
    local.value.uploadNeeded = true
}

watch(() => local.value.title, (value) =>
    local.value.slug = useSlug(value)
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


const manualMode = ref(false)
const headphone = ref()

const brand = ref()
const model = ref()

const type = ref('iem')

const errors = ref([])

</script>