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
    <div v-if="settingsVisible && editable" class="border rounded-lg p-6 my-6">
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


</script>