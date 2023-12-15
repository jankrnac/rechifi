<template>

<div class="flex flex-grow flex-shrink-1">

        <div class="bg-white rounded-xl flex flex-1 border min-h-screen border-gray-300 content">
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

</template>

<script setup>
import draggable from "vuedraggable";

const props = defineProps({
    layout: {
        type: Object,
        default(rawProps) {
            return {
                elements: []
            }
        }
    }
})

const local = ref(props.layout)
const project = useState('project')

const menuElement = ref({})
const emit = defineEmits(['change'])

const options = ref()
const showMenu = (element) => {
    menuElement.value = element
    options.value.$.exposed.open()

}

const onRemove = async (elementid) => {
    props.layout.elements.splice(props.layout.elements.findIndex(obj => obj.id == elementid), 1) 
}

const onImageChange = async (path) => {
    menuElement.value.data.banner.value = path
}


</script>