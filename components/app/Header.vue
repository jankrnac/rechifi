<template>

<header>
    <nav class="flex items-center p-6" aria-label="Global">
        <div class="flex mr-0 lg:mr-6">
          	<nuxt-link to="/" class="flex items-center">
            	<span class="sr-only">Your Company</span>
            	<Logo class="w-12 h-12 mr-6" />
				<h1 class="hidden 2xl:flex text-2xl">
					<span class="font-bold">Rechifi.</span> 
					<span class="font-playfair -mt-0.5">com</span>
				</h1>
          	</nuxt-link>
        </div>
		
        <!-- Navigation links -->
        <div class="hidden xl:flex gap-x-6 mr-8 xl:gap-x-12 2xl:mx-20">
          <nuxt-link v-for="item in navigation" :key="item.name" :to="item.href" class="text text-base leading-6">{{ t(item.name) }}</nuxt-link>
        </div>

        <!-- Search -->
        <div class="flex-1 mr-2 lg:mr-6 2xl:mr-24 relative">
			<IconsSearch class="w-5 h-5 absolute top-3.5 left-4 text-gray-400 hidden lg:block" />
            <input 	class="bg-gray-50 p-3 pl-4 lg:pl-12 rounded-lg border w-full text-sm lg:text-base dark:bg-gray-800 dark:border-gray-700" 
					type="text" 
					:placeholder="t('search-placeholder')"
					v-model="query"
					@keypress.enter="search()"
				/>
        </div>

        <!-- Right header -->
        <div class="flex justify-end">
			<div class="hidden lg:flex">
				<ClientOnly>
					<IconsSun v-if="colorMode.preference == 'dark'" class="w-6 h-6 mr-5 cursor-pointer"  @click="setColorMode('light')"/>
					<IconsMoon v-else class="w-6 h-6 cursor-pointer mr-5"  @click="setColorMode('dark')"/>
					<template #fallback>
						<IconsMoon class="w-6 h-6 cursor-pointer mr-5" />
					</template>
				

					<PopoverGroup class="flex gap-x-12">
						<Popover class="relative">
						<PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 focus:outline-0">
							<IconsUser class="w-6 h-6" />
						</PopoverButton>

						<transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
							<PopoverPanel v-slot="{ close }" class="absolute right-0 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-lg dark:bg-gray-700 shadow-lg ring-1 ring-gray-900/5">
							<div class="p-2">

								<!-- Guest -->
								<nuxt-link v-if="!user" to="/login" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="close">
									<IconsLogin class="w-5 h-5"/>
									<div>Login</div>
								</nuxt-link>

								<!-- Authenticated -->
								<nuxt-link v-if="user" to="/reviews/new" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="close">
									<IconsPlus class="w-5 h-5"/>
									<div>Add review</div>
								</nuxt-link>
								<nuxt-link v-if="user" to="/reviews/my" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="close">
									<IconsArticle class="w-5 h-5"/>
									<div>My reviews</div>
								</nuxt-link>
								<nuxt-link v-if="user" to="/settings" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="close">
									<IconsGear class="w-5 h-5"/>
									<div>Settings</div>
								</nuxt-link>
								<nuxt-link v-if="user" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="logout">
									<IconsLogout class="w-5 h-5"/>
									<div>Logout</div>
								</nuxt-link>

							</div>
					
							</PopoverPanel>
						</transition>
						</Popover>
					</PopoverGroup>
				</ClientOnly>
			</div>

			<!-- Mobile only, hamburger -->
			<div class="flex ml-4 justify-end xl:hidden">
				<button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5" @click="mobileMenuOpen = true">
					<span class="sr-only">Open main menu</span>
					<IconsHamburger class="w-6 h-6"/>
				</button>
			</div>


        </div>

      </nav>
	  
	  <ClientOnly>
		
		<Dialog as="div" class="xl:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
		<div class="fixed inset-0 z-10" />
		<DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-gray-900 px-7 py-10 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:text-gray-200">
			<div class="flex items-center justify-end">
		
			<div>
				<IconsSun v-if="colorMode.preference == 'dark'" class="w-6 h-6 mr-5 cursor-pointer"  @click="setColorMode('light')"/>
				<IconsMoon v-else class="w-6 h-6 cursor-pointer mr-5"  @click="setColorMode('dark')"/>
			</div>
			<button type="button" class="-m-2.5 rounded-md p-2.5" @click="mobileMenuOpen = false">
				<span class="sr-only">Close menu</span>
				<IconsCross class="w-6 h-6" aria-hidden="true" />
			</button>
			</div>
			
			<div class="mt-6 flow-root">
			<div class="-my-6 divide-y divide-gray-500/10">
				
				<!-- Navigation section -->
				<div class="space-y-2 py-6">
					<a v-for="item in navigation" :key="item.name" :href="item.href" class="block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50">{{ t(item.name) }}</a>
				</div>

				<!-- User section -->
				<div class="py-6">

					<!-- Guest -->
					<nuxt-link v-if="!user" to="/login" class="flex gap-2 items-center p-2 hover:bg-gray-50 rounded cursor-pointer" @click="mobileMenuOpen = false">
						<IconsLogin class="w-5 h-5"/>
						<div>Login</div>
					</nuxt-link>

					<!-- Authenticated -->
					<nuxt-link v-if="user" to="/reviews/new" class="flex gap-2 items-center hover:bg-gray-50 p-2 rounded cursor-pointer" @click="mobileMenuOpen = false">
						<IconsPlus class="w-5 h-5"/>
						<div>Add review</div>
					</nuxt-link>
					<nuxt-link v-if="user" to="/reviews/my" class="flex gap-2 items-center hover:bg-gray-50 p-2 rounded cursor-pointer" @click="mobileMenuOpen = false">
						<IconsArticle class="w-5 h-5"/>
						<div>My reviews</div>
					</nuxt-link>
					<nuxt-link v-if="user" to="/settings" class="flex gap-2 items-center hover:bg-gray-50 p-2 rounded cursor-pointer" @click="mobileMenuOpen = false">
						<IconsGear class="w-5 h-5"/>
						<div>Settings</div>
					</nuxt-link>
					<nuxt-link v-if="user" class="flex gap-2 items-center hover:bg-gray-50 p-2 rounded cursor-pointer" @click="logout">
						<IconsLogout class="w-5 h-5"/>
						<div>Logout</div>
					</nuxt-link>

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
	
	const supabase = useSupabaseClient()
	const user = useSupabaseUser()

	const { t } = useI18n({
		useScope: 'local'
	})

	const navigation = [
		{ name: 'home', href: '/' },
		{ name: 'articles', href: '/blog' },
		{ name: 'reviews', href: '/reviews' },
		{ name: 'iems', href: '/iems' },
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

	const logout = async () => {
		await supabase.auth.signOut()

		window.location.href="/"
	}

</script>

<i18n lang="yaml">
 en:
  home: 'Home'
  articles: 'Articles'
  reviews: 'Reviews'
  iems: 'In-Ear Monitors'
  upcoming: 'Upcoming'
  search-placeholder: 'Search for articles and products'
 cz:
  home: 'Domů'
  articles: 'Články'
  reviews: 'Recenze'
  iems: 'Sluchátka' 
  upcoming: 'Novinky'
  search-placeholder: 'Hledej v článcích a slúchatkách'
</i18n>