<template>
    <Combobox as="div" v-model="selectedPerson">
      <div class="relative">
        <ComboboxInput class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" @change="query = $event.target.value" :display-value="(person) => person?.name" />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
  
        <ComboboxOptions v-if="filtered.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ComboboxOption v-for="person in filtered" :key="person.username" :value="person" as="template" v-slot="{ active, selected }">
            <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
              <div class="flex">
                <span :class="['truncate', selected && 'font-semibold']">
                  {{ person.name }}
                </span>
                <span :class="['ml-2 truncate text-gray-500', active ? 'text-indigo-200' : 'text-gray-500']">
                  {{ person.username }}
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
  
    const { data:headphones } = await useAsyncData('combobox', () => queryContent('/headphones'))
  
    const query = ref('')
    const selected = ref(null)
    
    const filtered = computed(() =>
    query.value === ''
      ? people
      : headphones.filter((headphone) => {
          return headphonej.name.toLowerCase().includes(query.value.toLowerCase())
        })
  )
  </script>