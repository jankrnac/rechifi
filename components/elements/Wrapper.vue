<template>

<div class="flex">
	<div class="w-full text-center relative border" :class="[optionsVisible ? 'border-blue-400 border-dashed':'border-white']" 
        @mouseover="showHover" 
        @mouseout="hideHover" 
        >

        <div class="absolute p-2 bg-teal-500 text-white top-2 left-2 rounded-sm cursor-move z-40" v-show="optionsVisible">
            <IconsGrab class="w-6 h-6"/>
        </div>
        
    	<component :is="componentsMap[element.type]" :data="element.data" :element="element"></component>



	</div>

</div>


</template>

<script setup>

    import { onClickOutside } from '@vueuse/core'

    const props = defineProps({
        element: {
            type: Object,
            required: true
        },
    })

    const optionsVisible = ref(false)

    const showHover = () => { 
        optionsVisible.value = true
    }

    const hideHover = () => {
        optionsVisible.value = false
    }


    const emit = defineEmits(['clicked', 'deleted'])


    const removed = (el) => {
        emit('deleted', el)
    }

    const componentsMap = {
        header: resolveComponent('ElementsHeader'),


    }

</script>
