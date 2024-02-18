<template>

    <div>
    
        <input v-show="0" ref="fileInput" @change="selected" type="file" multiple>
    
        <div @click="clickHandler" class="cursor-pointer">
            <slot></slot>
        </div>
    
    </div>
    
    </template>
    
    <script setup>
    
    defineProps({
        aspectRatio: {
            type: Number
        }
    })
    
    const fileInput = ref(null)
    
    const emit = defineEmits(['cropped'])
    
    const selected = () => {

        const formData = new FormData()

        const data = {
            blobs: []
        }

        fileInput.value.files.forEach(element => {
            formData.append('files[]', element)

            data.blobs.push(URL.createObjectURL(element))

            console.log(element)

        })

        data.form = formData
    
        emit('uploaded', data)
    
    }
    
    const clickHandler = () => {
        fileInput.value.click()
    }
    
    
    
    </script>
    