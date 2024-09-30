<template>
<div class="text-left">

    <h2 class="text-3xl mb-6"><strong>Sound signature</strong></h2>

    <div v-if="editable" class="w-[300px]">
        <USelectMenu value-attribute="id" v-model="element.data.signature" :options="signatures" multiple placeholder="Select signatures" size="xl"/>
    </div>

    <ul v-else class="flex space-x-3">
        <li v-for="signature in element.data.signature" 
            class="px-6 py-3 rounded-lg shadow-lg text-xl font-thin flex items-center gap-x-2"
            :class="[
                signature == 'bright' ? 'bg-yellow-200' : '',
                signature == 'dark' ? 'bg-gray-700  text-white' : '',
                signature == 'warm' ? 'bg-orange-700  text-white' : '',
                signature == 'v-shaped' ? 'bg-blue-700  text-white' : '',
                signature == 'u-shaped' ? 'bg-purple-700  text-white' : ''

            ]"
        >
            <UIcon v-if="signature == 'bright'" name="i-ph-headlights"/>
            <UIcon v-if="signature == 'dark'" name="i-ph-moon"/>
            <UIcon v-if="signature == 'warm'" name="i-ph-sun"/>


            {{ signatures.find(e=>e.id == signature).label }}
        </li>
    </ul>

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

    const signatures = [
        {
            id: 'bright',
            label: "Bright"
        },
        {
            id: 'dark',
            label: "Dark"
        },
        {
            id: 'u-shapaed',
            label: "U Shaped"
        },
        {
            id: 'v-shapaed',
            label: "V Shaped"
        },
        {
            id: 'warm',
            label: "Warm"
        },
    ]

</script>