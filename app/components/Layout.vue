<template>

<div class="flex flex-1 content relative z-[1]" :class="[editable ? 'border dark:border-gray-700 rounded-xl border-gray-300' : 'border-transparent']">
    <!--Classic, non editable mode -->

    <template v-if="!editable">
        <div class="flex flex-col gap-y-12 w-full">
            <ElementsWrapper
                v-for="element in elements"
                :editable="editable" 
                :element="element"
                :elements="elements"
            />
        </div>
    </template>

    <!-- Editable mode -->
    <template v-else>
    <ClientOnly>
        <draggable
            class="min-h-screen w-full max-w-app flex flex-col gap-y-12"
            v-model="local"
            group="elements"
            handle=".dragHandle"
            item-key="index"
            @change="$emit('change', local)"
            :disabled="!editable"
            @start="dragging=true"
            @end="dragging=false"

        >

            <template #item="{ element, index }">
                <ElementsWrapper
                    :editable="editable" 
                    :dragging="dragging"
                    :element="element"
                    @deleted="onRemove(element.id, index)"
                    @change="onChange(element.id, $event)"
                    :elements="availableElements"
                />
            </template>

        </draggable> 
    </ClientOnly>   
    </template>  
</div>
        

</template>

<script setup>
import draggable from "vuedraggable";

const dragging = ref(false)

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

const { data:availableElements } = await useFetch('/api/elements')

const local = ref(props.elements)

const menuElement = ref({})
const emit = defineEmits(['change'])

const onChange = (elementid, data) => {
    local.value.find(obj => obj.id == elementid).data[Object.values(data)[0]] = Object.values(data)[1]
    emit('change', local.value)
}

const onRemove = async (elementid) => {
    local.value.splice(local.value.findIndex(obj => obj.id == elementid), 1)
     
}

const onImageChange = async (path) => {
    menuElement.value.data.banner.value = path
}



</script>