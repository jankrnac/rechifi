<template>

<div>
	<ClientOnly>
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
        	<PopoverPanel open class="absolute left-1/2 z-10 w-screen max-w-[550px] -translate-x-1/2 transform px-4 sm:px-0">
            	<div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                	<div class="relative bg-white p-2 text-gray-800 text-left flex flex-col items-start gap-2">
						<div v-for="[key, value] of Object.entries(options)">
							<component 
								:is="componentsMap[key]" 
								:model="key"
								:element="element"
								:options="options"
								@change="changed"
							/>
						</div>
						
                    	<Button color="red" @click="$emit('delete')">
                        	<Icon name="ph:x" class="w-4 h-4 mr-2"/>
                        	Delete
						</Button>
					</div>
				</div>
			</PopoverPanel>
		</transition>
	</Popover>
	</ClientOnly>
</div>
</template>
  
<script setup>

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

const props = defineProps({
	element: {
		type: Object
	},
	options: {
		type: Object 
	}
})

const emits = defineEmits(['change'])
const changed = (data) => {
	emits('change', data)
}

const componentsMap = {
	textAlign: resolveComponent('ElementsOptionsTextalign'),
	image: resolveComponent('ElementsOptionsImage'),
	reversed: resolveComponent('ElementsOptionsToggle'),
	images: resolveComponent('ElementsOptionsImages')
}

  
</script>
  