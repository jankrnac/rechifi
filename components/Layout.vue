<template>

<div class="flex flex-grow flex-shrink-1">
        <div class="bg-white flex flex-1 min-h-screen content border" :class="[editable ? 'rounded-xl border-gray-300' : 'border-transparent']">
            <draggable
                class="min-h-screen w-full max-w-app p-6 mx-auto flex flex-col gap-y-6"
                v-model="local"
                group="elements"
                item-key="id"
                @change="$emit('change', local)"
                :disabled="!editable" 
            >

                <template #item="{ element, index }">
                    <ElementsWrapper
                        :editable="editable" 
                        :element="element"
                        @deleted="onRemove(element.id, index)"
                        @change="onChange(element.id, $event)"
                        :elements="elements"
                    />
                </template>

            </draggable>      
        </div>
        
</div>

</template>

<script setup>
import draggable from "vuedraggable";

const props = defineProps({
    elements: {
        type: Array,
        default: () => []
    },
    editable:{
        type: Boolean,
        default: false
    },
    nav: {
        type: Array
    }
})

const { data:elements } = await useFetch('/api/elements')

const local = ref(props.elements)

const menuElement = ref({})
const emit = defineEmits(['change'])

const onChange = (elementid, data) => {
    props.elements.find(obj => obj.id == elementid).data[Object.keys(data)[0]] = Object.values(data)[0]
}

const onRemove = async (elementid) => {
    props.elements.splice(props.elements.findIndex(obj => obj.id == elementid), 1) 
}

const onImageChange = async (path) => {
    menuElement.value.data.banner.value = path
}


</script>