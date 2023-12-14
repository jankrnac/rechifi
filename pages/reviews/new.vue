<template>
 
<div class="max-w-app mx-auto">
    
    <div class="flex justify-between py-2 items-center">
        <ElementsAvailable />
        <div class="bg-green-300 px-4 py-1.5 rounded-lg text-sm flex items-center cursor-pointer">
            <IconsUpload class="w-4 h-4 mr-2"/>
            Publish
        </div>
        <div class="bg-green-300 px-4 py-1.5 rounded-lg text-sm flex items-center cursor-pointer">
            <IconsUpload class="w-4 h-4 mr-2"/>
            Publish
        </div>
    </div>

    <div class="rounded-xl border min-h-screen border-gray-300">
       
        <div class="flex justify-center p-12 content">
            <draggable
                class="min-h-screen w-full max-w-app p-6 mx-auto flex flex-col gap-y-12"
                v-model="local.elements"
                group="elements"
                item-key="id"
                @change="$emit('change', local)"
            >

                <template #item="{ element, index }">
                    <ElementsWrapper
                        :editable="true" 
                        :element="element"
                        @deleted="onRemove(element.id, index)"
                    />
                </template>

            </draggable>    
        </div>
    </div>

</div>

</template>

<script setup>

import draggable from "vuedraggable";

const props = defineProps({
    layout: {
        type: Object,
        default() {
            return {
                elements: []
            }
        }
    }
})

definePageMeta({
    middleware: 'auth'
});

const local = ref(props.layout)




</script>