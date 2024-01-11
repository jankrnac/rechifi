<template>

<div class="flex">
	<div class="w-full text-center relative border" :class="[optionsVisible ? 'border-blue-400 border-dashed':'border-white dark:border-gray-950']" 
        @mouseover="showHover" 
        @mouseout="hideHover" 
        >

        <div class="absolute text-white -top-8 left-2 z-[9] flex gap-1" v-show="optionsVisible">
            <div class="cursor-move mb-1 bg-teal-500 p-1 rounded"><IconsUpdown class="w-6 h-6"/></div>
            <ElementsOptions @delete="deleted" @change="changed" :data="elements.find(e => e.type == element.type).data"/>
        </div>
        
    	<component 
            :is="componentsMap[element.type]" 
            :element="element" 
            :editable="editable"
            @change="changed"
        >
        </component>

	</div>

</div>


</template>

<script setup>

    const props = defineProps({
        element: {
            type: Object,
            required: true
        },
        editable: {
            type: Boolean,
            default: false
        },
        elements: {
            type: Array
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

    const deleted = () => {
        emits('deleted', props.element)
    }

    const componentsMap = {
        title: resolveComponent('ElementsTitle'),
        paragraph: resolveComponent('ElementsParagraph'),
        image: resolveComponent('ElementsImage'),
        proscons: resolveComponent('ElementsProsCons'),
        score: resolveComponent('ElementsScore'),
        section: resolveComponent('ElementsSection'),
        'image-text': resolveComponent('elements-image-text'),
    }

</script>
