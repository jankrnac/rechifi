<template>

<div>

    <input v-show="0" ref="fileInput" @change="selected" type="file">

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
    
    formData.append('file', fileInput.value.files[0]);

    const data = {}

    data.blob = URL.createObjectURL(fileInput.value.files[0])
    data.form = formData

    emit('uploaded', data)

}

const clickHandler = () => {
    fileInput.value.click()
}



</script>
