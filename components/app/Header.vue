<template>

<header>
    <nav class="flex items-center p-6 lg:px-8" aria-label="Global">

        <div class="flex">
          	<nuxt-link to="/" class="flex items-center">
            	<span class="sr-only">Your Company</span>
            	<Logo class="w-12 h-12 mr-6" />
				<h1 class="text-2xl">
					<span class="font-bold">Chifi.</span> 
					<span class="font-playfair">blog</span>
				</h1>
          	</nuxt-link>
        </div>
		
        <!-- Navigation links -->
        <div class="hidden lg:flex lg:gap-x-12 mx-24">
          <nuxt-link v-for="item in navigation" :key="item.name" :to="item.href" class="text text-base leading-6">{{ t(item.name) }}</nuxt-link>
        </div>

        <!-- Search -->
        <div class="hidden lg:flex lg:flex-1 lg:mr-24 relative">
			<IconsSearch class="w-5 h-5 absolute top-3.5 left-4 text-gray-400" />
            <input 	class="bg-gray-50 p-3 pl-12 rounded-lg border w-full dark:bg-gray-800 dark:border-gray-700" 
					type="text" 
					:placeholder="t('search-placeholder')"
					v-model="query"
					@keypress.enter="search()"
				/>
        </div>

		<!-- Mobile only -->
		<div class="flex flex-1 justify-end ml-6 lg:hidden">
			<button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5" @click="mobileMenuOpen = true">
				<span class="sr-only">Open main menu</span>
				<IconsHamburger class="w-8 h-8"/>
			</button>
        </div>


        <!-- Right header -->
        <div class="hidden lg:flex lg:justify-end">
			<ClientOnly>
				<IconsSun v-if="colorMode.preference == 'dark'" class="w-6 h-6 mr-5 cursor-pointer"  @click="setColorMode('light')"/>
				<IconsMoon v-else class="w-6 h-6 cursor-pointer mr-5"  @click="setColorMode('dark')"/>
				<template #fallback>
					<IconsMoon class="w-6 h-6 cursor-pointer mr-5" />
				</template>
			</ClientOnly>

			<PopoverGroup class="hidden lg:flex lg:gap-x-12">
				<Popover class="relative">
				<PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6">
					<IconsUser class="w-6 h-6" />
				</PopoverButton>

				<transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
					<PopoverPanel class="absolute right-0 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
					<div class="p-4">
						dsf
					</div>
			
					</PopoverPanel>
				</transition>
				</Popover>
			</PopoverGroup>

        </div>

      </nav>

	  <ClientOnly>
	  <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <IconsCross class="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
            </div>
            <div class="py-6">
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
</ClientOnly>

</header>

</template>
  
<script setup>

	import { Dialog, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'

	const { t } = useI18n({
		useScope: 'local'
	})

	const navigation = [
		{ name: 'home', href: '/' },
		{ name: 'articles', href: '/blog' },
		{ name: 'reviews', href: '/reviews' },
		{ name: 'headphones', href: '/headphones' },
		{ name: 'upcoming', href: '/upcoming' },

	]
  
  	const mobileMenuOpen = ref(false)

  	const colorMode = useColorMode()


	const setColorMode = (value) => {
		colorMode.preference = value
	}

	const query = ref()
	const search = async () => {
		await navigateTo(`/search/${query.value}`)
	}
</script>

<i18n lang="yaml">
 en:
  home: 'Home'
  articles: 'Articles'
  reviews: 'Reviews'
  headphones: 'Headphones'
  upcoming: 'Upcoming'
  search-placeholder: 'Search for articles and headphones'
 cz:
  home: 'Domů'
  articles: 'Články'
  reviews: 'Recenze'
  headphones: 'Sluchátka' 
  upcoming: 'Novinky'
  search-placeholder: 'Hledej v článcích a slúchatkách'
</i18n>