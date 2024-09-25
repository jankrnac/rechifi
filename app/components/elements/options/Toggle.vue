<template>
	<div>
		<div class="text-xs font-bold mb-1 capitalize">{{ model }}</div>

		<UToggle v-model="enabled" />

	</div>
</template>
  
<script setup>
    import { SwitchGroup, Switch } from '@headlessui/vue'

    const props = defineProps({
        model: String
    })

    const enabled = ref(false)

    const emits = defineEmits(['change'])

    watch(enabled, (value) => {
        emits('change', {
            [props.model]: value 
        })
    })

</script>