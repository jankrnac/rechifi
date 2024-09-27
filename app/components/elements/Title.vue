<template>
<div>
	<div class="mb-12">
		<h1 class="font-bold text-4xl">
			<span v-html="title" class="outline-none"></span>
			<UTooltip v-if="editable" text="Change title in settings." class="absolute">
				<UIcon name="i-ph-info" size="20px" class="ml-2" />
			</UTooltip>
		</h1>
		<div class="flex justify-center gap-4 text-sm">
			<div class="text-gray-500 dark:text-gray-200 italic mt-2 flex items-center justify-center">
				<UIcon name="i-ph-user" class="w-4 h-4 mr-1" />
				<nuxt-link :to="'/users/' + user.username" class="text">{{ user.username || user.email}}</nuxt-link>
			</div>
			<div class="text-gray-500 dark:text-gray-200 italic mt-2 flex items-center justify-center">
				<UIcon name="i-ph-calendar" class="w-4 h-4 mr-1" />
				{{ new Date(date).toLocaleString('en-us',{month:'long', day:'numeric', year:'numeric'}) }}
			</div>
		</div>
	</div>
		
	<div class="text-sm text-left text-gray-400 ml-1">Navigation
		<UTooltip v-if="editable" text="Navigation links are created automatically based on 'Section start' elements"  :ui="{ base : 'text-clip h-[40px]'}">
			<UIcon name="i-ph-info" />
		</UTooltip>
	</div>
	<nav class="hidden lg:flex justify-center items-center gap-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border p-5 rounded-lg">
		<template v-for="(item, index) in nav">
		<a class="text" :href="'#'+item.data.name">
			{{ item.data.name }}
		</a>
		<Icon v-if="index < nav.length-1"  name="ph:dot" />
		</template>
	</nav>
	
	<ClientOnly>
	<Menu as="div" class="relative w-full inline-block text-left px-1 mt-1 lg:hidden">
		<div>
		<MenuButton class="inline-flex w-full justify-left gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
			Jump to
			<Icon name="ph:caret-down" class="-mr-1 text-gray-400" aria-hidden="true" />
		</MenuButton>
		</div>

		<transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
		<MenuItems class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
			<div v-for="(item) in nav" class="py-1">
			<MenuItem v-slot="{ active }">
				<a :href="'#'+item.data.name" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{ item.data.name }}</a>
			</MenuItem>
			</div>
		</MenuItems>
		</transition>
	</Menu>
	</ClientOnly>

</div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

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
	const user = inject('user')
	const title = useState('title')


	const share = (provider) => {
		if(provider == 'fb')
		{

		}
	}

	

</script>
