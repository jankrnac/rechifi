<template>

<div>

</div>
</template>
  
<script setup>

const props = defineProps({
	element: {
		type: Object
	},
	options: {
		type: Object 
	}
})

const emits = defineEmits(['change','delete'])
const changed = (data) => {
	emits('change', data)
}

const componentsMap = {
	textAlign: resolveComponent('ElementsOptionsTextalign'),
	image: resolveComponent('ElementsOptionsImage'),
	reversed: resolveComponent('ElementsOptionsToggle'),
	images: resolveComponent('ElementsOptionsImages'),
	text: resolveComponent('ElementsOptionsText')

}

  
</script>
  