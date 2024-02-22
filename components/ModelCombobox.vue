<template>
  
    <Combobox as="div" v-model="selected" >
      <div class="relative w-[400px]">
        <ComboboxInput 
			:id="inputId" 
			class="w-full rounded-md border-0 bg-white py-2.5 pl-4 pr-12 dark:bg-gray-800 shadow-sm focus:outline-none ring-1 ring-inset ring-gray-300 dark:ring-gray-600 sm:leading-6" 
			@change="query = $event.target.value" :display-value="(headphone) => headphone?.model ? headphone?.model : headphone._dir + ' '+ headphone._path.split('/')[3]" 
		/>
        <ComboboxButton :id="buttonId" class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          	<IconsCaretDown class="h-5 w-5 text-gray-400 mr-1" aria-hidden="true" />
        </ComboboxButton>
  
        <ComboboxOptions class="absolute z-10 mt-1 max-h-[510px] w-full overflow-auto rounded-md bg-white dark:bg-gray-700  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
			<ComboboxOption v-if="queryProduct" :value="queryProduct">
				<li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : '']">
				Use "{{ query }}"
				</li>
			</ComboboxOption>
			<ComboboxOption v-for="headphone in filtered" :key="headphone.model" :value="headphone" as="template" v-slot="{ active, selected }">
            <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : '']">
              <div v-if="headphone.model" class="flex">
                <span :class="['truncate capitalize', selected && 'font-semibold']">
                  {{ headphone.model }}
                </span>
                <span :class="['ml-2 truncate capitalize text-gray-400', active ? 'text-indigo-200' : 'text-gray-500']">
                  {{ headphone.brand }}
                </span>
              </div>

              <div v-else>
                <span :class="['truncate capitalize', selected && 'font-semibold']">
                  {{  headphone._path.split('/')[3]  }}
                </span>
                <span :class="['ml-2 truncate capitalize text-gray-400', active ? 'text-indigo-200' : 'text-gray-500']">
                  {{ headphone._dir }}
                </span>
              </div>
  
              <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
                <IconsCheck class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
  
    </Combobox>
    
</template>
  
<script setup>

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/vue'

const inputId = useId()
const buttonId = useId()


const props = defineProps({
      model: {
        	type: String,
        	default: 'iems'
      	}
    })

const { data:headphones } = await useAsyncData(props.model, () => queryContent(props.model).find(), { 
	watch: [() => props.model]
})

const query = ref('')
const selected = ref(null)

const queryProduct = computed(() => {
	return query.value === '' ? null : { id: null, name: query.value }
})


const filtered = computed(() =>
query.value === ''
	? headphones.value
	: headphones.value.filter((headphone) => {
		return (headphone.model ? headphone.model.toLowerCase().includes(query.value.toLowerCase()) :  headphone._path.toLowerCase().includes(query.value.toLowerCase()))
		|| (headphone.brand ? headphone.brand.toLowerCase().includes(query.value.toLowerCase()) : headphone._path.split('/')[3].toLowerCase().includes(query.value.toLowerCase()))
	}))


</script>