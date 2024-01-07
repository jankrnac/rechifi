<template>

<div class="block lg:flex justify-between max-w-[800px] mx-auto lg:py-12">

    <div class="text-left">
		<div class="flex items-center mb-4">
			<h2 class="text-xl font-semibold !mt-0">Pros</h2>
			<IconsThumbsUp class="w-6 h-6 ml-2 text-green-600"/>
		</div>
        <ul :contenteditable="editable" class="outline-none leading-8" spellcheck="false" @input="updatePros">
            <li v-for="pro in pros" class="outline-none">{{ pro }}</li>
		</ul>
    </div>

    <div class="text-left">
		<div class="flex items-center mb-4">
			<h2 class="text-xl font-semibold !mt-0">Cons</h2>
			<IconsThumbsDown class="w-6 h-6 ml-2 text-red-600"/>
		</div>        
		<ul :contenteditable="editable" class="outline-none leading-8" spellcheck="false" @input="updateCons">
            <li v-for="con in cons">{{ con }}</li>
		</ul>
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

	const pros = props.element.data.pros
	const cons = props.element.data.cons

	const emits = defineEmits(['change'])

	const updatePros = (e) => {

		emits('change', {
			type: 'pros',
			value:  Array.from(e.target.children).map(e => e.innerText)
		})

	}

	const updateCons = (e) => {

		emits('change', {
			type: 'cons',
			value:  Array.from(e.target.children).map(e => e.innerText)
		})

	}

</script>
