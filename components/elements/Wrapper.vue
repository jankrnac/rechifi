<template>

<div class="flex">
	<div class="w-full text-center relative border" :class="[optionsVisible ? 'border-blue-400 border-dashed':'border-white']" 
        @mouseover="showHover" 
        @mouseout="hideHover" 
        >

        <div class="absolute p-1 bg-teal-500 text-white top-2 left-2 rounded cursor-move z-40" v-show="optionsVisible">
            <IconsUpdown class="w-6 h-6"/>
        </div>
        
    	<component 
            :is="componentsMap[element.type]" 
            :data="element.data" 
            :element="element" 
            :editable="editable"
            @change="changed"
        >
        </component>

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
        editable: {
            type: Boolean,
            default: false
        }
    })

    const optionsVisible = ref(false)

    const showHover = () => { 
        if(props.editable) optionsVisible.value = true
    }

    const hideHover = () => {
        optionsVisible.value = false
    }


    const emits = defineEmits(['change', 'deleted'])

    const changed = (e) => {
        emits('change', e)
    }

    const removed = (el) => {
        emits('deleted', el)
    }

    const componentsMap = {
        header: resolveComponent('ElementsHeader'),

    }

</script>
