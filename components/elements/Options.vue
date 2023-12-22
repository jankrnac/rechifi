<template>

<div>
    <Popover v-slot="{ open }" class="relative">
        <PopoverButton class="group inline-flex items-center rounded-md bg-blue-300 p-1 text-sm focus:outline-none">
            <IconsGear class="w-6 h-6"/>
        </PopoverButton>
  
        <transition
        	enter-active-class="transition duration-200 ease-out"
          	enter-from-class="translate-y-1 opacity-0"
          	enter-to-class="translate-y-0 opacity-100"
          	leave-active-class="transition duration-150 ease-in"
          	leave-from-class="translate-y-0 opacity-100"
          	leave-to-class="translate-y-1 opacity-0"
        >
        	<PopoverPanel class="absolute left-1/2 z-10 w-screen max-w-[350px] -translate-x-1/2 transform px-4 sm:px-0">
            	<div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                	<div class="relative bg-white p-2 text-gray-800 text-left flex flex-col gap-2">
						<div v-for="[key, value] of Object.entries(data)">
							<component :is="componentsMap[key]" @change="changed"></component>
						</div>
						
                    	<div class="flex items-center gap-2 hover:bg-red-100 px-4 py-3 rounded-lg cursor-pointer " @click="$emit('delete')">
                        	<IconsCross class="w-4 h-4"/>
                        	Delete
						</div>
					</div>
				</div>
			</PopoverPanel>
		</transition>
	</Popover>
</div>
</template>
  
<script setup>

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

const props = defineProps({
	data: {
		type: Object 
	}
})

const emits = defineEmits(['change'])
const changed = (data) => {
	emits('change', data)
}

const componentsMap = {
	textAlign: resolveComponent('ElementsOptionsTextalign'),
	image: resolveComponent('ElementsOptionsImage')
}

  
</script>
  