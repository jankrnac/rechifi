<template>
<div class="text-left">

<h2 class="font-black mb-6"><strong>Sound signature</strong></h2>

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