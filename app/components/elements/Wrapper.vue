<template>

<div class="flex">

    
	<div class="w-full text-center relative border" :class="[optionsVisible ? 'border-blue-400 border-dashed':'border-white dark:border-gray-950']" 
        @mouseover="showHover" 
        @mouseout="hideHover" 
    >

        <div class="absolute text-white flex flex-col -top-4 -left-14 z-[9] gap-1 p-4 min-h-full" v-show="optionsVisible">

            <div class="cursor-move rounded dragHandle">
                <UButton icon="i-ph-caret-up-down" color="teal"/>
            </div>
            
            <!-- Options popup wrapper-->
       
        </div>

        <!-- Dynamic layout component, see componentsMap variable -->
    	<component 
            :is="componentsMap[element.type]" 
            :element="element" 
            :editable="editable"
            :dragging="dragging"
            @change="changed"
        />

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
        dragging: {
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
        gallery: resolveComponent('elementsGallery'),
        signature: resolveComponent('elementsSignature'),

    }

</script>
