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
            <div class="mx-auto max-w-3xl text-center lg:max-w-7xl">
            <div class="pb-24 mt-16">
                <h1 class="text-6xl font-bold tracking-tight text-gray-900">Sluchátka</h1>
                <p class="mx-auto mt-4 max-w-3xl text-xl text-gray-500">Seznam všech slúchatek čínskych výrobců na jednom místě</p>
            </div>

            <section aria-labelledby="filter-heading" class="border-t border-gray-200 py-6">
                <h2 id="filter-heading" class="sr-only">Product filters</h2>

                <div class="flex items-center justify-between">
                <Menu as="div" class="relative inline-block text-left">
                    <div>
                    <MenuButton class="group inline-flex justify-center items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Seřadit
                        <IconsCaretDown class="-mr-1 ml-1 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    </MenuButton>
                    </div>

                    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                        <MenuItem v-for="option in sortOptions" :key="option" v-slot="{ active }">
                            <a :href="option.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm font-medium text-gray-900']">{{ option.name }}</a>
                        </MenuItem>
                        </div>
                    </MenuItems>
                    </transition>
                </Menu>

                <button type="button" class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden" @click="open = true">Filtre</button>

                <PopoverGroup class="hidden sm:flex sm:items-baseline sm:space-x-8">
                    <Popover as="div" v-for="(section, sectionIdx) in filters" :key="section.name" :id="`desktop-menu-${sectionIdx}`" class="relative inline-block text-left">
                    <div>
                        <PopoverButton class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900 outline-none">
                        <span>{{ section.name }}</span>
                        <IconsCaretDown  class="-mr-1 ml-1 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                        </PopoverButton>
                    </div>

                    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                        <PopoverPanel class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <form class="space-y-4">
                            <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                            <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900">{{ option.label }}</label>
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
    <div class="lg:max-w-7xl mx-auto mt-12">
        <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            <li v-for="item in headphones" :key="item.source" class="relative">
            <div class="aspect-h-10 aspect-w-10 block w-full overflow-hidden rounded-lg hover:-translate-y-1 transition">
                <nuxt-img :src="item.cover" alt="" class="pointer-events-none object-cover" />
                <nuxt-link class="absolute inset-0" :to="item._path"></nuxt-link>
            </div>
            <p class="pointer-events-none mt-2 block truncate text font-bold text-gray-900">{{ item.fullname }}</p>
            <Label class="capitalize my-1">{{ item.drivers[0] }}</Label>
            <p class="pointer-events-none block text-sm font-medium text-gray-500 capitalize">{{ item.priceRange }}</p>

            </li>
        </ul>
  </div>
</div>
</template>


<script setup>
import { Dialog,DialogPanel,Disclosure,DisclosureButton,DisclosurePanel,Menu,MenuButton } from '@headlessui/vue'
import { MenuItem,MenuItems,Popover,PopoverButton,PopoverGroup,PopoverPanel,TransitionChild, TransitionRoot} from '@headlessui/vue'

const { data:brands } = await useFetch('/api/brands')


  
const headphones = await queryContent('/headphones')
  
    .sort({ date: -1 }) // show latest articles first

    .where({ _partial: false }) // exclude the Partial files

    .find()


const sortOptions = [
  { name: 'Dle názvu', href: '#' },
  { name: 'Dle hodnocení', href: '#' },
  { name: 'Nejnovejší', href: '#' },
]
const filters = [
  {
    id: 'category',
    name: 'Typ',
    options: [
      { value: 'iem', label: 'Do uší' },
    ],
  },
  {
    id: 'brand',
    name: 'Výrobca',
    options:brands.value
  },
  {
    id: 'driver',
    name: 'Měnič',
    options: [
      { value: 'white', label: 'White' },
      { value: 'black', label: 'Black' },
      { value: 'grey', label: 'Grey' },
    ],
  },
]

const open = ref(false)
</script>