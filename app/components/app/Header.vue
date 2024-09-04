<template>

<header>
    <nav class="flex items-center p-6 border-b lg:border-none" aria-label="Global">
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
        <div class="hidden xl:flex gap-x-2 mr-8 xl:gap-x-4 2xl:mx-12">
			
			<div class="hidden lg:flex lg:gap-x-6">

				<UButton variant="ghost" color="gray" to="/blog"><span class="font-semibold">{{ t('news') }}</span></UButton>
				<UButton variant="ghost" color="gray" to="/reviews"><span class="font-semibold">{{ t('reviews') }}</span></UButton>

				<UPopover mode="hover">

					<UButton variant="ghost" color="gray" trailing-icon="i-ph-caret-down"><span class="font-semibold">Products</span></UButton>

				    <template #panel>

						<div class="p-3 text-sm">
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
						</template>
					
				</UPopover>

				<UButton variant="ghost" color="gray" to="/upcoming"><span class="font-semibold">{{ t('upcoming') }}</span></UButton>

			</div>
        </div>

        <!-- Search -->
        <div class="hidden md:block flex-1 mr-2 lg:mr-6 2xl:mr-12 relative">
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
			<div class="hidden lg:flex items-center gap-x-2">

				<UButton variant="solid" icon="i-ph-plus-circle" size="lg" color="sky" class="cursor-pointer" label="Add" to="/add"/>


						<UPopover mode="hover" :popper="{ placement: 'bottom-end' }">
							<UButton icon="i-ph-user-light" color="gray" variant="ghost" size="xl"/>

							<template #panel>

							<div class="p-2"> 
								<!-- Guest -->
								<nuxt-link v-if="!loggedIn" to="/login" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
									<Icon name="ph:sign-in-light" size="20px" />
									<div>Login</div>
								</nuxt-link>
								
								<!-- Authenticated -->
								 <template v-if="loggedIn">
									<nuxt-link :to="'/users/' + user.username" class="flex gap-6 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
										<Icon name="ph:user-light" />
										<div>My profile</div>
									</nuxt-link>
									<nuxt-link to="/posts/my" class="flex gap-6 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
										<Icon name="ph:read-cv-logo-light" />
										<div>My posts</div>
									</nuxt-link>
									<nuxt-link to="/settings" class="flex gap-6 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
										<Icon name="ph:gear-light" />
										<div>Settings</div>
									</nuxt-link>
									<nuxt-link class="flex gap-6 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="logout">
										<Icon name="ph:sign-out-light" />
										<div>Logout</div>
									</nuxt-link>
								</template>

							</div>

						</template>
					
						</UPopover>
				
					<UButton variant="ghost" size="xl"icon="i-ph-sun-light" color="gray" v-if="colorMode.preference == 'dark'" class="cursor-pointer"  @click="setColorMode('light')"/>
					<UButton variant="ghost" size="xl" icon="i-ph-moon-light" color="gray" v-else class="cursor-pointer"  @click="setColorMode('dark')"/>
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
	  
	  
		
	<UModal v-model="mobileMenuOpen">
		<div class="fixed inset-0 z-10" />
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
						<UAccordion v-else :items="navigation.children"/>
							
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
					<nuxt-link v-if="user" to="/posts/my" class="flex gap-2 items-center hover:bg-gray-50 p-2 rounded cursor-pointer" @click="mobileMenuOpen = false">
						<Icon name="ph:read-cv-logo-light" size="20px" />
						<div>My posts</div>
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
		</UModal>
</header>

</template>

<script setup>
	
	const { t } = useI18n({
		useScope: 'local'
	})

	const { loggedIn, user, clear } = useUserSession()

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
		clear()

		window.location.href="/"
	}
	


</script>

<i18n lang="yaml">
 en:
  home: 'Home'
  news: 'Articles'
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