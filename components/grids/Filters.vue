<template>
<div aria-labelledby="filter-heading" class="border-t border-gray-200 dark:border-gray-600 py-6">
    
    <h2 id="filter-heading" class="sr-only">Product filters</h2>

    <div class="flex items-center justify-between">
        
        <!-- Mobile filter dialog -->
        <GridsMobileFilters ref="mobileDialog" :filters="filters"/>

        <div class="flex items-center">
        <Listbox as="div" class="w-[200px] flex items-center" v-model="activeSort">
            <ListboxLabel class="block text-sm font-medium leading-6 mr-2">Sort by:</ListboxLabel>
            <div class="relative flex-1">
    
            <ListboxButton class="relative w-full cursor-default rounded-md bg-white dark:bg-gray-800 dark:ring-gray-600 py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none  sm:text-sm sm:leading-6">
                <span class="block truncate">{{ activeSort.label }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <i class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ListboxOptions class="text-left absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-for="sort in sortOptions" :key="sort.value" :value="sort" v-slot="{ active, selected }">
                    <li :class="[active ? 'bg-indigo-600 text-white' : '', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ sort.label }}</span>

                    <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                        <i class="h-5 w-5" aria-hidden="true" />
                    </span>
                    </li>
                </ListboxOption>
                </ListboxOptions>
            </transition>
            </div>
        </Listbox>

      
    </div>

        
    <button type="button" class="inline-block text-sm font-medium sm:hidden" @click="openMobileDialog">Filters</button>

    <div class="flex items-center gap-x-8">
        <div class="flex text-sm items-center gap-x-2" v-for="(filter, filterIdx) in filters.filter(e=>e.type=='checkbox')" >
        <Switch  
            :key="filter.name" 
            v-model="activeFilters[filter.id]"
            :class="activeFilters[filter.id] ? 'bg-blue-600' : 'bg-gray-200'"
            class="relative inline-flex h-6 w-11 items-center rounded-full"
        >
            <span class="sr-only">Enable notifications</span>
            <span :class="activeFilters[filter.id] ? 'translate-x-6' : 'translate-x-1'" class="inline-block h-4 w-4 transform rounded-full bg-white transition"/>
        </Switch>
        <div>{{ filter.name }}</div>
        </div>
        <PopoverGroup class="hidden sm:flex sm:items-baseline sm:space-x-8">
            <Popover as="div" v-for="(filter, filterIdx) in filters.filter(e=>e.type=='list')" :key="filter.name" :id="`desktop-menu-${filterIdx}`" class="relative inline-block text-left">
            <div>
                <PopoverButton class="group inline-flex items-center justify-center text-sm font-medium outline-none">
                <span>{{ filter.name }}</span>
                <IconsCaretDown  class="-mr-1 ml-1 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                </PopoverButton>
            </div>

            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <PopoverPanel class="max-h-[510px]  overflow-y-auto absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <form class="space-y-4">
                    <div v-for="(option, optionIdx) in filter.options" :key="option.value" class="flex items-center">
                    <input :id="`filter-${filter.id}-${optionIdx}`" :name="`${filter.id}[]`" :value="option.value" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600" v-model="activeFilters[filter.id]"/>
                    <label :for="`filter-${filter.id}-${optionIdx}`" class="ml-3 whitespace-nowrap pr-6 text-sm font-medium cursor-pointer">{{ option.label }}</label>
                    </div>
                </form>
                </PopoverPanel>
            </transition>
            </Popover>
        </PopoverGroup>
    
    </div>
    </div>
</div>

</template>

<script setup>

import { Switch, Listbox, ListboxLabel,ListboxButton, ListboxOptions, ListboxOption ,Popover,PopoverButton,PopoverGroup,PopoverPanel} from '@headlessui/vue'

const props = defineProps({

    sortOptions:{
        type: Array
    },
    filters: {
        type: Array
    }
})

const activeFilters = useState('activeFilters')

const activeSort = useState('activeSort', () => {
    return {}
})



const mobileDialog = ref(null)

const openMobileDialog = () => {
    mobileDialog.value.setOpen()
}

</script>