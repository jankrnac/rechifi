<template>

<div>

    <!-- Filters -->
    <div>

        <!-- Mobile filter dialog -->
        <TransitionRoot as="template" :show="open">
            <Dialog as="div" class="relative z-40 sm:hidden" @close="open = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div class="fixed inset-0 z-40 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="translate-x-full">
                        <DialogPanel class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                            <div class="flex items-center justify-between px-4">
                                <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                                <button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" @click="open = false">
                                    <span class="sr-only">Close menu</span>
                                    <IconsCross class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                    <!-- Filters -->
                    <form class="mt-4">
                        <Disclosure as="div" v-for="section in filters" :key="section.name" class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                        <h3 class="-mx-2 -my-3 flow-root">
                            <DisclosureButton class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                            <span class="font-medium text-gray-900">{{ section.name }}</span>
                            <span class="ml-6 flex items-center">
                                <IconsCaretDown :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']" aria-hidden="true" />
                            </span>
                            </DisclosureButton>
                        </h3>
                        <DisclosurePanel class="pt-6">
                            <div class="space-y-6">
                            <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                                <input :id="`filter-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <label :for="`filter-mobile-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-500">{{ option.label }}</label>
                            </div>
                            </div>
                        </DisclosurePanel>
                        </Disclosure>
                    </form>
                    </DialogPanel>
                </TransitionChild>
                </div>
            </Dialog>
            </TransitionRoot>

            <!-- Desktop -->
            <div class="mx-auto max-w-3xl text-center lg:max-w-app">
            <div class="pb-16 mt-16">
                <h1 class="text-6xl font-bold tracking-tight text-gray-900">{{ t('headphones') }}</h1>
                <p class="mx-auto mt-4 max-w-3xl text-xl text-gray-500">{{t('slogan')}}</p>
            </div>

            <div class="text-left h-12">
                <ul class="text-sm mb-4 flex gap-x-3">
                    <template v-for="[key, values] of Object.entries(activeFilters)">
                    <li v-if="values.length" class="flex items-center">
                        <template v-if="values.length">
                            <div class="mr-2 capitalize">{{ key }}:</div>
                            <div v-for="value in values" class="flex items-center gap-x-2 bg-gray-200 rounded px-2 py-1">
                                <div>{{ value }}</div>
                                <IconsCross class="w-4 h-4 cursor-pointer" @click="activeFilters[key] = activeFilters[key].filter(e => e != value)"/>
                            </div>
                        </template>
                    </li>
                    </template>
                </ul>
            </div>

            <section aria-labelledby="filter-heading" class="border-t border-gray-200 py-6">
                <h2 id="filter-heading" class="sr-only">Product filters</h2>

                <div class="flex items-center justify-between">
                    <Listbox as="div" class="w-[200px] flex items-center" v-model="activeSort">
                        <ListboxLabel class="block text-sm font-medium leading-6 mr-2">{{ t('sort') }}:</ListboxLabel>
                        <div class="relative flex-1">
                        <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none  sm:text-sm sm:leading-6">
                            <span class="block truncate">{{ activeSort.label }}</span>
                            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <i class="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </ListboxButton>

                        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                            <ListboxOptions class="text-left absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <ListboxOption as="template" v-for="sort in sortOptions" :key="sort.value" :value="sort" v-slot="{ active, selected }">
                                <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
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

                <button type="button" class="inline-block text-sm font-medium sm:hidden" @click="open = true">Filters</button>

                <PopoverGroup class="hidden sm:flex sm:items-baseline sm:space-x-8">
                    <Popover as="div" v-for="(filter, filterIdx) in filters" :key="filter.name" :id="`desktop-menu-${filterIdx}`" class="relative inline-block text-left">
                    <div>
                        <PopoverButton class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900 outline-none">
                        <span>{{ filter.name }}</span>
                        <i  class="-mr-1 ml-1 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
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
            </section>
            </div>
    </div>

    <!-- Grid -->
    <div class="lg:max-w-app mx-auto mt-12">
        <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">

            <template v-for="item in headphones">
                <ProductBox :product="item" />
            </template>
        </ul>
  </div>
</div>
</template>


<script setup>
import { Dialog,DialogPanel,Disclosure,DisclosureButton,DisclosurePanel, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { Listbox,ListboxLabel ,Popover,PopoverButton,PopoverGroup,PopoverPanel,TransitionChild, TransitionRoot} from '@headlessui/vue'

const { data:brands } = await useFetch('/api/brands')

const route = useRoute()

const activeFilters = ref({})

activeFilters.value.signature = []
activeFilters.value.drivers = []
activeFilters.value.brand = []

const driverFilter = computed(() => {
    console.log(activeFilters.value.brand.length)
    if (activeFilters.value.brand.length) return { $in: activeFilters.value.brand }
    return  {}
})

const { data:headphones, refresh } = await useAsyncData('home', () => queryContent('/headphones')
  
    .sort({ date: -1 }) // show latest articles first

    .where({ _partial: false }) // exclude the Partial files

    .where({ 'drivers': driverFilter.value })

    .find()
)




const { t } = useI18n({
	useScope: 'local'
})


const sortOptions = [
    { label: t('name'), value:'name' },
    { label: 'Dle hodnocení', value: 'rating' },
    { label: 'Nejnovejší', value: 'released' },
]

const activeSort = ref(sortOptions[0])


const filters = [
    {
        id: 'signature',
        name: 'Signature',
        options: [
            { value: 'bright', label: 'Bright' },
            { value: 'warm', label: 'Warm' },
            { value: 'v-shaped', label: 'V-shaped' },
            { value: 'u-shaped', label: 'U-shaped' },
            { value: 'w-shaped', label: 'W-shaped' },
            { value: 'dark', label: 'Dark' },

        ],
    },

    {
        id: 'brand',
        name: 'Brand',
        options:brands.value
    },

    {
        id: 'drivers',
        name: 'Drivers',
        options: [
            { value: 'DD', label: 'DD' },
            { value: 'planar', label: 'Planar' },
            { value: 'BA', label: 'BA' },
            { value: 'EST', label: 'EST' },

        ],
    },
]

const open = ref(false)


watch(activeFilters, async (value) => {
    
    await refresh()

    await navigateTo({ 
        path: route.path,
        query: activeFilters.value
})
}, { deep: true })

</script>


<i18n lang="yaml">
    en:
     headphones: 'Headphones'
     sort: 'Sort'
     slogan: All headphones from asian country manufacturers in one place
     name: 'By name'
    cz:
     headphones: "Sluchátka"
     slogan: Seznam všech slúchatek čínskych výrobců na jednom místě
     sort: 'Seřadit'
</i18n>