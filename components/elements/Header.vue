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
	<nav class="hidden lg:flex justify-center items-center gap-4 bg-gray-50 border p-5 rounded-lg">
		<template v-for="(item, index) in nav">
		<a class="text" :href="'#'+item.data.name">
			{{ item.data.name }}
		</a>
		<IconsWave v-if="index < nav.length-1" class="w-4 h-4"/>
		</template>
	</nav>
	
	<Menu as="div" class="relative w-full inline-block text-left px-1 mt-1">
		<div>
		<MenuButton class="inline-flex w-full justify-left gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
			Jump to
			<ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
		</MenuButton>
		</div>

		<transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
		<MenuItems class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
			<div class="py-1">
			<MenuItem v-slot="{ active }">
				<a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Account settings</a>
			</MenuItem>
			<MenuItem v-slot="{ active }">
				<a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Support</a>
			</MenuItem>
			<MenuItem v-slot="{ active }">
				<a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">License</a>
			</MenuItem>
			<form method="POST" action="#">
				<MenuItem v-slot="{ active }">
				<button type="submit" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">Sign out</button>
				</MenuItem>
			</form>
			</div>
		</MenuItems>
		</transition>
	</Menu>

		<div class="flex flex-row justify-end items-center gap-1 mt-2">
			<div class="text-gray-500 text-sm mr-1">Share on:</div>
			<IconsFacebook class="w-6 h-6 text-[#4267B2]" @click="share('fb')"/>

		</div>
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

	const share = (provider) => {
		
	}
</script>
