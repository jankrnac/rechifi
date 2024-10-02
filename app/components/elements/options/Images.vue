<template>

<div>
    <div class="text-xs font-bold mb-1">Images</div>

    <div v-if="element.data.images.length" class="text-xs mb-2">Drag to rearrange.</div>

    <ClientOnly>
    <draggable
        class="list-group flex gap-2 mb-2"
        :list="element.data.images"
        item-key="id"

        >
        <template #item="{ element, index }">
            <div class="inline-block relative group">
                <nuxt-img :src="element" class="inline-block rounded-lg" width="80" densities="x1" format="webp" />
            </div>
        </template>

    </draggable>
    </ClientOnly>
    
    <UploadMulti @uploaded="imagesAdded">
        <UButton color="blue" size="xs">Add images</UButton>
    </UploadMulti>

</div>

</template>
    
<script setup>
import draggable from "vuedraggable";

const props = defineProps(['element'])

const imagesAdded = (data) => {
    props.element.uploads = data.form
    props.element.data.images.push(...data.blobs)
}

</script>