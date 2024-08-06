<template>

<div class="flex flex-1 min-h-screen content border relative z-[99]" :class="[editable ? 'rounded-xl border-gray-300' : 'border-transparent']">
    <!--Classic, non editable mode -->

    <template v-if="useRoute().name == 'reviews-username-brand-model'">
        <div class="flex flex-col gap-y-6 min-h-screen w-full">
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
            class="min-h-screen w-full max-w-app flex flex-col gap-y-6"
            v-model="local"
            group="elements"
            item-key="id"
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
    console.log(data)
    props.elements.find(obj => obj.id == elementid).data[Object.values(data)[0]] = Object.values(data)[1]
}

const onRemove = async (elementid) => {
    props.elements.splice(props.elements.findIndex(obj => obj.id == elementid), 1) 
}

const onImageChange = async (path) => {
    menuElement.value.data.banner.value = path
}


</script>