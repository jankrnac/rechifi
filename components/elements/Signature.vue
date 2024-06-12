<template>
<div class="text-left">

<div class="font-black text-4xl mb-6">Sound signature</div>

<div v-if="editable">
    <div>
        <div v-for="sig in signatures">
            <div>{{ sig.label }}</div>
        </div>
    </div>
</div>

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
            name: 'warm',
            label: "Warm"
        }
    ]

</script>