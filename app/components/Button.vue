<template>

<button 
    class="rounded-lg relative overflow-hidden font-semibold text-sm text-white inline-flex items-center justify-center disabled:opacity-40" 
    :type="type"
    :class="{
        'bg-gray-300' : color == 'gray',
        'bg-red-400 hover:bg-red-500' : color == 'red',
        'bg-green-400' : color == 'green',
        'bg-blue-400 hover:bg-blue-500' : color == 'blue',
        'text-sm px-4 py-3' : size == 'big',
        'text-sm px-4 py-2' : size == 'normal',
        'text-xs px-2 py-1' : size == 'small'
    }"
>
    <div :class="{'opacity-0' : loading}" class="flex items-center">
        <slot></slot>
    </div>

    <Loader v-if="loading"/>

</button>

</template>

<script setup>


const props = defineProps({
    size: {
        type: String,
        default: "normal"
    },
    color: {
        type: String,
        default: 'gray'
    },
    loading: {
        type: Boolean,
        default: false
    },
    type:{
        type: String,
        default: 'button'
    }
})

</script>