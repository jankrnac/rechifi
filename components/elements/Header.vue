<template>
<div>
	<div class="mb-12">
		<h1 class="font-semibold">
			<span :contenteditable="editable" :spellcheck="false" class="outline-none" @input="update">{{element.data.text}}</span>
		</h1>
		<div class="flex justify-center gap-4 text-sm">
			<div class="text-gray-500 italic mt-2 flex items-center justify-center">
				<IconsUser class="w-4 h-4 mr-1" />
				{{  useRoute().params.username }}
			</div>
			<div class="text-gray-500 italic mt-2 flex items-center justify-center">
				<IconsCalendar class="w-4 h-4 mr-1" />
				{{ new Date(date).toLocaleString('en-us',{month:'long', day:'numeric', year:'numeric'}) }}
			</div>
		</div>
	</div>
		
	<div class="text-sm text-left text-gray-400 ml-1">Navigation</div>
	<nav class="flex justify-center items-center gap-4 bg-gray-50 border p-5 rounded-lg">
		<template v-for="(item, index) in nav">
		<a class="text" :href="'#'+item.data.name">
			{{ item.data.name }}
		</a>
		<IconsWave v-if="index < nav.length-1" class="w-4 h-4"/>
		</template>
	</nav>
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
		},
		nav: {
			type: Array
		},
		date: {
			type: String
		}
	})

	const emits = defineEmits(['change'])

	const update = (e) => {
		emits('change', {
			type: 'text',
			value: e.target.innerText
		})
	}

	const nav = inject('nav')
	const date = inject('date')


</script>
