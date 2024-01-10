<template>
    <Combobox as="div" v-model="selected" >
      <div class="relative w-[400px]">
        <ComboboxInput class="w-full rounded-md border-0 bg-white py-3.5 pl-4 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 text-lg sm:leading-6" @change="query = $event.target.value" :display-value="(headphone) => headphone?.model" />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <IconsCaretDown class="h-5 w-5 text-gray-400 mr-1" aria-hidden="true" />
        </ComboboxButton>
  
        <ComboboxOptions v-if="filtered.length > 0" class="absolute z-10 mt-1 max-h-100 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ComboboxOption v-for="headphone in filtered" :key="headphone.model" :value="headphone" as="template" v-slot="{ active, selected }">
            <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
              <div class="flex">
                <span :class="['truncate', selected && 'font-semibold']">
                  {{ headphone.model }}
                </span>
                <span :class="['ml-2 truncate text-gray-400', active ? 'text-indigo-200' : 'text-gray-500']">
                  {{ headphone.brand }}
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

import { Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
  
    const { data:headphones } = await useAsyncData('combobox', () => queryContent('iems').only(['model', 'brand']).find())
  
    const query = ref('')
    const selected = ref(null)
    
    const filtered = computed(() =>
    query.value === ''
      ? headphones.value
      : headphones.value.filter((headphone) => {
          return headphone.model.toLowerCase().includes(query.value.toLowerCase()) || headphone.brand.toLowerCase().includes(query.value.toLowerCase())
        }))
</script>