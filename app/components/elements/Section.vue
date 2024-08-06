<template>

<div :id="element.data.name" :class="[editable ? 'pb-3' : 'opacity-0 pb-0 max-h-0 overflow-hidden']">
    <div v-if="editable" class="text-left bg-white relative z-[12] inline-block px-2 outline-none" contenteditable="true" spellcheck="false" @input="update">{{element.data.name}}</div>
    <div v-if="editable" class="border-b -mt-3 relative z-[11] border-blue-200 border-dashed"></div>
</div>

</template>

<script setup>

    const props = defineProps({
        element: {
            type: Object
        },
        editable: {
            type: Boolean,
            default: false
        }
    })

	const emits = defineEmits(['change'])

	const update = (e) => {
		emits('change', {
			type: 'name',
			value: e.target.innerText
		})
	}

</script>