<template>

<header>
    <nav class="flex items-center p-6" aria-label="Global">
        <div class="flex mr-0 lg:mr-6 flex-1 md:grow-0">
          	<nuxt-link to="/" class="flex items-center ">
            	<span class="sr-only">Your Company</span>
            	<Logo class="w-10 h-10 mr-6 lg:w-12 lg:h-12" />
				<h1 class="2xl:flex text-xl">
					<span class="relative">
						<span class="text-xl font-bold tracking-wide">Re</span>
						<span class="font-medium">chifi</span>
						<div class="absolute text-xs bg-red-500 text-white px-1 py-0.5 rounded -top-1 -right-6 rotate-[30deg] opacity-50">beta</div>
					</span> 
				</h1>
          	</nuxt-link>
        </div>
		
        <!-- Navigation links -->
        <div class="hidden xl:flex gap-x-6 mr-8 xl:gap-x-12 2xl:mx-20">
			
			<PopoverGroup class="hidden lg:flex lg:gap-x-12">

				<nuxt-link to="/blog" class="text text-sm font-semibold leading-6">{{ t('news') }}</nuxt-link>
				<nuxt-link to="/reviews" class="text text-sm font-semibold leading-6">{{ t('reviews') }}</nuxt-link>

				<Popover class="relative" v-slot="{ open,close }">
					<div class="relative flex">
						<PopoverButton 
								:id="popoverId"
                                @mouseover="(e) => hoverPopover(e, open)"
                                @mouseleave="closePopover(close)"
                                class="border-transparent relative text-sm font-semibold leading-6 z-10 bg-transparent flex items-center outline-none duration-200 ease-out">
                               <div class="h-full flex items-center">{{ t('products') }}</div>
                            </PopoverButton>
				</div>

				<transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
					<PopoverPanel 
						@mouseover.prevent="popoverHover = true"
                        @mouseleave.prevent="closePopover(close)"
						class="absolute left-1/2 z-[102] mt-5 flex w-screen max-w-sm -translate-x-1/2 px-4">
						<div class="w-screen max-w-md flex-auto overflow-hidden rounded-lg bg-white dark:bg-gray-700 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
						<div class="p-2">
							<div class="group relative flex items-center gap-x-6 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800">
								<div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg">
									<IconsIem class="h-10 w-10 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
								</div>
								<div>
									<nuxt-link to="/iems" class="font-semibold">
										In-ear monitors
										<span class="absolute inset-0" />
									</nuxt-link>
								</div>
							</div>
							<div class="group relative flex items-center gap-x-6 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800">
								<div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg">
									<IconsDap class="h-10 w-10 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
								</div>
								<div>
									<nuxt-link to="/daps" class="font-semibold">
										Digital audio players
										<span class="absolute inset-0" />
									</nuxt-link>
								</div>
							</div>
							<div class="group relative flex items-center gap-x-6 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800">
								<div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg">
									<IconsDac class="h-10 w-10 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
								</div>
								<div>
									<nuxt-link to="/dacs" class="font-semibold">
										DAC & AMP dongles
										<span class="absolute inset-0" />
									</nuxt-link>
								</div>
							</div>
						</div>
					
						</div>
					</PopoverPanel>
				</transition>
				</Popover>

				<nuxt-link to="/upcoming" class="text text-sm font-semibold leading-6">{{ t('upcoming') }}</nuxt-link>
				<nuxt-link to="/sales" class="text text-sm font-semibold leading-6">{{ t('sales') }}</nuxt-link>

			</PopoverGroup>
        </div>

        <!-- Search -->
        <div class="hidden md:block flex-1 mr-2 lg:mr-6 2xl:mr-24 relative">
			<Icon name="ph:magnifying-glass-light" class="w-5 h-5 absolute top-3.5 left-4 text-gray-400 hidden lg:block" />
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
					
					<Icon name="ph:sun-light" v-if="colorMode.preference == 'dark'" class="mr-5 cursor-pointer"  @click="setColorMode('light')"/>
					<Icon name="ph:moon-light" v-else class="cursor-pointer mr-5"  @click="setColorMode('dark')"/>
			

					<PopoverGroup class="flex gap-x-12">
						<Popover class="relative">
						<PopoverButton 
							:id="popoverId"
							class="flex items-center gap-x-1 text-sm font-semibold leading-6 focus:outline-0">
							<Icon name="ph:user-light" />
						</PopoverButton>

						<transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
							<PopoverPanel v-slot="{ close }" class="absolute bg-white right-0 top-full z-[880] mt-3 w-screen max-w-xs overflow-hidden rounded-lg dark:bg-gray-700 shadow-lg ring-1 ring-gray-900/5">
							<div class="p-2">

								<!-- Guest -->
								<nuxt-link v-if="!user" to="/login" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="close">
									<Icon name="ph:sign-in-light" size="20px" />
									<div>Login</div>
								</nuxt-link>

								<!-- Authenticated -->
								<nuxt-link v-if="user" :to="'/users/' + profile.username" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="close">
									<Icon name="ph:user-light" />
									<div>My profile</div>
								</nuxt-link>
								<nuxt-link v-if="user" to="/reviews/new" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="close">
									<Icon name="ph:plus-circle-light" />
									<div>Add review</div>
								</nuxt-link>
								<nuxt-link v-if="user" to="/reviews/my" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="close">
									<Icon name="ph:read-cv-logo-light" />
									<div>My reviews</div>
								</nuxt-link>
								<nuxt-link v-if="user" to="/settings" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="close">
									<Icon name="ph:gear-light" />
									<div>Settings</div>
								</nuxt-link>
								<nuxt-link v-if="user" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="logout">
									<Icon name="ph:sign-out-light" />
									<div>Logout</div>
								</nuxt-link>

							</div>
					
							</PopoverPanel>
						</transition>
						</Popover>
					</PopoverGroup>
				
			</div>

			<!-- Mobile only, hamburger -->
			<div class="flex ml-4 justify-end xl:hidden">
				<button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5" @click="mobileMenuOpen = true">
					<span class="sr-only">Open main menu</span>
					<Icon name="ph:list-light" class="w-6 h-6"/>
				</button>
			</div>


        </div>

      </nav>
	  
	  
		
	<Dialog as="div" class="xl:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
		<div class="fixed inset-0 z-10" />
		<DialogPanel class="fixed inset-y-0 right-0 z-[190] w-full overflow-y-auto bg-white dark:bg-gray-900 px-7 py-10 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:text-gray-200">
			<div class="flex items-center justify-end">
		
			<div>
				<Icon name="ph:sun-light" v-if="colorMode.preference == 'dark'" class="w-6 h-6 mr-5 cursor-pointer"  @click="setColorMode('light')"/>
				<Icon name="ph:moon-light" v-else class="w-6 h-6 cursor-pointer mr-5"  @click="setColorMode('dark')"/>
			</div>
			<button type="button" class="-m-2.5 rounded-md p-2.5" @click="mobileMenuOpen = false">
				<span class="sr-only">Close menu</span>
				<Icon name="ph:x-light" aria-hidden="true" />
			</button>
			</div>
			
			<div class="mt-2 flow-root">
			<div class="-my-6 divide-y divide-gray-500/10">
			
					<!-- Search -->
					<div class="block flex-1 relative mt-10">
					<Icon name="ph:magnifying-glass-light" size="20" class="absolute top-3.5 left-4 text-gray-400 hidden lg:block" />
					<input class="bg-gray-50 p-3 pl-12 rounded-lg border w-full text-sm focus:outline-none lg:text-base dark:bg-gray-800 dark:border-gray-700" 
							type="text" 
							:placeholder="t('search-placeholder')"
							v-model="query"
							@keypress.enter="search()"
						/>
				</div>
				
				<!-- Navigation section -->
				<div class="space-y-2 py-6">
					<div v-for="item in navigation" :key="item.name" :href="item.href" class="">
						<a v-if="!item.children" :href="item.href" :class="[item.current ? 'bg-gray-50' : 'dark:hover:bg-gray-700  hover:bg-gray-50', 'block rounded-md py-2 p-2 text-sm leading-6 font-semibold']">{{ t(item.name) }}</a>
						<Disclosure as="div" v-else v-slot="{ open }">
							<DisclosureButton :class="[item.current ? 'bg-gray-50 dark:bg-gray-700' : 'dark:hover:bg-gray-700 hover:bg-gray-50', 'flex items-center justify-between w-full text-left rounded-md p-2 text-sm leading-6 font-semibold']">
							{{ t(item.name) }}
							<Icon name="ph:caret-down" :class="[open ? 'rotate-90 text-gray-500' : 'text-gray-400', 'h-5 w-5 shrink-0']" aria-hidden="true" />

							</DisclosureButton>
							<DisclosurePanel as="ul" class="mt-1 px-2">
								<li v-for="subItem in item.children" :key="subItem.name">
									<nuxt-link :to="subItem.href" :class="[subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50', 'block rounded-md py-2 pr-2 pl-5 text-sm leading-6']" @click="mobileMenuOpen = false">{{ t(subItem.name) }}</nuxt-link>
								</li>
							</DisclosurePanel>
						</Disclosure>
					</div>
				</div>

				<!-- User section -->
				<div class="py-6">

					<!-- Guest -->
					<nuxt-link v-if="!user" to="/login" class="flex gap-2 items-center p-2 hover:bg-gray-50 rounded cursor-pointer" @click="mobileMenuOpen = false">
						<Icon name="ph:sign-in-light" size="20px" />
						<div>Login</div>
					</nuxt-link>

					<!-- Authenticated -->
					<nuxt-link v-if="user" to="/reviews/new" class="flex gap-2 items-center hover:bg-gray-50 p-2 rounded cursor-pointer" @click="mobileMenuOpen = false">
						<Icon name="ph:plus-circle-light" size="20px" />
						<div>Add review</div>
					</nuxt-link>
					<nuxt-link v-if="user" to="/reviews/my" class="flex gap-2 items-center hover:bg-gray-50 p-2 rounded cursor-pointer" @click="mobileMenuOpen = false">
						<Icon name="ph:read-cv-logo-light" size="20px" />
						<div>My reviews</div>
					</nuxt-link>
					<nuxt-link v-if="user" to="/settings" class="flex gap-2 items-center hover:bg-gray-50 p-2 rounded cursor-pointer" @click="mobileMenuOpen = false">
						<Icon name="ph:gear-light" size="20px" />
						<div>Settings</div>
					</nuxt-link>
					<nuxt-link v-if="user" class="flex gap-2 items-center hover:bg-gray-50 p-2 rounded cursor-pointer" @click="logout">
						<Icon name="ph:sign-out-light" size="20px"/>
						<div>Logout</div>
					</nuxt-link>

				</div>
			</div>
			</div>
		</DialogPanel>
		</Dialog>

</header>

</template>
  
<script setup>

	import { Dialog, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
	
	const supabase = useSupabaseClient()
	const user = useSupabaseUser()

	const { data:profile } = await useAsyncData(async () => {
		const { data } = await supabase.from('profiles').select('*').eq('id',user.value.id).single()

		return data
	})


	const { t } = useI18n({
		useScope: 'local'
	})

	const popoverId = useId()

	const navigation = [
		{ name: 'news', href: '/blog' },
		{ name: 'reviews', href: '/reviews' },
		{ name: 'products', children: [
			{
				name: 'iems', href: '/iems',
			},
			{
				name: 'daps', href: '/daps',
			},
			{
				name: 'dacs', href: '/dacs',
			}
		]},
		{ name: 'upcoming', href: '/upcoming' },
		{ name: 'sales', href:"/sales" }
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
	
	const popoverHover = ref(false)
	const popoverTimeout = ref(null)

	const hoverPopover = (e, open) => {
	popoverHover.value = true
	if (!open) e.target.parentNode.click()
	}

	const closePopover = (close) => {
	popoverHover.value = false
	if (popoverTimeout.value) clearTimeout(popoverHover.value)
	popoverTimeout.value = setTimeout(() => {
		if (!popoverHover.value) close()
	}, 600)
	}

</script>

<i18n lang="yaml">
 en:
  home: 'Home'
  news: 'News'
  reviews: 'Reviews'
  iems: 'In-Ear Monitors'
  daps: 'Digital audio players'
  dacs: 'Digital audio converters'
  products: 'Gear'
  upcoming: 'Upcoming'
  search-placeholder: 'Search for articles, reviews, audio gear and users'
  sales: 'Sales'
 cz:
  home: 'Domů'
  articles: 'Články'
  reviews: 'Recenze'
  iems: 'Sluchátka'
  upcoming: 'Novinky'
  search-placeholder: 'Hledej v článcích a slúchatkách'
  sales: 'Slevy'
</i18n>