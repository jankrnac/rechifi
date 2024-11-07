<template>

<header>

	
    <nav class="flex items-center p-6 border-b dark:border-gray-700 lg:border-none" aria-label="Global">
        <div class="flex mr-0 lg:mr-6 flex-1 md:grow-0">
          	<nuxt-link to="/" class="flex items-center ">
            	<span class="sr-only">Your Company</span>
				<nuxt-img src="logo.webp" width="30px" class="md:ml-4 mr-6" />
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

				<UButton variant="ghost" color="gray" to="/blog"><span class="font-semibold">News</span></UButton>
				<UButton variant="ghost" color="gray" to="/reviews"><span class="font-semibold">Reviews</span></UButton>

				<UPopover mode="hover">

					<UButton variant="ghost" color="gray" trailing-icon="i-ph-caret-down"><span class="font-semibold">Gear</span></UButton>

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

				<UButton variant="ghost" color="gray" to="/upcoming"><span class="font-semibold">Upcoming</span></UButton>

			</div>
        </div>

        <!-- Search -->
        <div class="hidden md:block flex-1 mr-2 lg:mr-6 2xl:mr-12 relative">
			<UIcon name="i-ph-magnifying-glass-light" class="w-5 h-5 absolute top-3.5 left-4 text-gray-400 hidden lg:block" />
            <input class="bg-gray-50 p-3 pl-4 lg:pl-12 rounded-lg border w-full text-sm lg:text-base dark:bg-gray-800 dark:border-gray-700" 
					type="text" 
					placeholder="Search"
					v-model="query"
					@keypress.enter="search()"
				/>
        </div>

        <!-- Right header -->
        <div class="flex justify-end">
			<div class="hidden lg:flex items-center gap-x-4">

				<UButton variant="solid" icon="i-ph-plus-circle" size="lg" color="sky" class="cursor-pointer" label="Post" to="/add"/>

						<UPopover mode="hover" :popper="{ placement: 'bottom-end' }">
							<UButton v-if="user && user.avatar" variant="ghost" aria-label="user">
								<div class="flex w-8 h-8 rounded-full overflow-hidden">
                                    <nuxt-img :src="user.avatar.filename" densities="x1" sizes="50px" class="min-h-full min-w-full flex-shrink-0 object-cover" />
                                </div>
							</UButton>
							<UButton v-else icon="i-ph-user-light" color="gray" aria-label="user" variant="ghost" size="xl"/>

							<template #panel>

							<div class="p-2"> 
								<!-- Guest -->
								<nuxt-link v-if="!loggedIn" to="/login" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
									<UIcon name="i-ph-sign-in-light" size="20px" />
									<div>Login</div>
								</nuxt-link>
								
								<!-- Authenticated -->
								 <template v-if="loggedIn">

									<Can :ability="createProduct">
										<nuxt-link to="/heroes" class="flex gap-6 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
											<UIcon name="i-ph-image-light" />
											<div>Heroes</div>
										</nuxt-link>
										<nuxt-link to="/products" class="flex gap-6 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
											<UIcon name="i-ph-cube-light" />
											<div>Products</div>
										</nuxt-link>
									</Can>
									<nuxt-link :to="'/users/' + user.username" class="flex gap-6 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
										<UIcon name="i-ph-user-light" />
										<div>My profile</div>
									</nuxt-link>
									<nuxt-link to="/settings" class="flex gap-6 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
										<UIcon name="i-ph-gear-light" />
										<div>Settings</div>
									</nuxt-link>
									<nuxt-link class="flex gap-6 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="logout">
										<UIcon name="i-ph-sign-out-light" />
										<div>Logout</div>
									</nuxt-link>
								</template>

							</div>

						</template>
					
						</UPopover>
				
					<UButton variant="ghost" size="xl"icon="i-ph-sun-light" color="gray" aria-label="color-light" v-if="colorMode.preference == 'dark'" class="cursor-pointer"  @click="setColorMode('light')"/>
					<UButton variant="ghost" size="xl" icon="i-ph-moon-light" color="gray" aria-label="color-dark" v-else class="cursor-pointer"  @click="setColorMode('dark')"/>
			</div>

			<!-- Mobile only, hamburger -->
			<div class="flex ml-4 justify-end xl:hidden">
				<button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5" @click="mobileMenuOpen = true">
					<span class="sr-only">Open main menu</span>
					<UIcon name="i-ph-list-light" class="w-6 h-6"/>
				</button>
			</div>


        </div>

      </nav>
	  
	  
		
	<USlideover v-model="mobileMenuOpen">
			<div class="flex items-center justify-between py-6 px-4">
				
				<UButton variant="solid" icon="i-ph-plus-circle" size="sm" label="Post" to="/add" @click="mobileMenuOpen = false" />

				<div class="flex">
					<div>
						<UIcon name="ph-sun-light" v-if="colorMode.preference == 'dark'" class="mr-5 cursor-pointer"  @click="setColorMode('light')" size="24px"/>
						<UIcon name="ph-moon-light" v-else class="cursor-pointer mr-5"  @click="setColorMode('dark')" size="24px"/>
					</div>

					<button type="button" @click="mobileMenuOpen = false">
						<span class="sr-only">Close menu</span>
						<UIcon name="ph-x-light" aria-hidden="true" size="24px"/>
					</button>
				</div>
			</div>
			
			<div class="flow-root px-4" >
				<div class="divide-y divide-gray-500/10">
				
						<!-- Search -->
						<div class="block flex-1 relative">
						<UIcon name="i-ph-magnifying-glass-light" size="20" class="absolute top-3.5 left-4 text-gray-400 hidden lg:block" />
						<UInput size="xl" 
								type="text" 
								icon="i-ph-magnifying-glass-thin"
								placeholder="Search"
								v-model="query"
								@keypress.enter="search()"
						>

						</UInput>
					</div>
					
					<!-- Navigation section -->
					<div class="space-y-2 py-6">


						<div v-for="item in navigation" :key="item.name" :href="item.href" class="">
							<a :href="item.href" :class="[item.current ? 'bg-gray-50' : 'dark:hover:bg-gray-700  hover:bg-gray-50', 'block rounded-md py-2 p-2 text-sm leading-6 font-semibold']">{{ item.name }}</a>
							<ul v-if="item.children">
								<li v-for="child in item.children">
									<nuxt-link :to="child.href" 
										:class="[child.current ? 'bg-gray-50' : 'dark:hover:bg-gray-700  hover:bg-gray-50', 'block ml-6 rounded-md py-2 p-2 text-sm leading-6 font-semibold']"
										@click="mobileMenuOpen = false"
										>{{ child.name }}
									</nuxt-link>
								</li>
							</ul>
								
						</div>
					</div>

					<!-- User section -->
					<div class="py-6">

						<!-- Guest -->
						<nuxt-link v-if="!user" to="/login" class="flex gap-2 items-center p-2 hover:bg-gray-50 rounded cursor-pointer" @click="mobileMenuOpen = false">
							<UIcon name="i-ph-sign-in-light" size="20px" />
							<div>Login</div>
						</nuxt-link>

						<!-- Authenticated -->
						<Can :ability="createProduct">
							<nuxt-link to="/heroes" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="mobileMenuOpen = false">
								<UIcon name="i-ph-image-light" size="20px" />
								<div>Heroes</div>
							</nuxt-link>
							<nuxt-link to="/products" class="flex gap-2 items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded cursor-pointer" @click="mobileMenuOpen = false">
								<UIcon name="i-ph-cube-light"  size="20px" />
								<div>Products</div>
							</nuxt-link>
						</Can>
						<nuxt-link v-if="user" :to="'/users/' + user.username" class="flex gap-2 items-center hover:bg-gray-50 p-2 rounded cursor-pointer" @click="mobileMenuOpen = false">
							<UIcon name="i-ph-user-light" size="20px" />
							<div>My Profile</div>
						</nuxt-link>
						<nuxt-link v-if="user" to="/settings" class="flex gap-2 items-center hover:bg-gray-50 p-2 rounded cursor-pointer" @click="mobileMenuOpen = false">
							<UIcon name="i-ph-gear-light" size="20px" />
							<div>Settings</div>
						</nuxt-link>
						<nuxt-link v-if="user" class="flex gap-2 items-center hover:bg-gray-50 p-2 rounded cursor-pointer" @click="logout">
							<UIcon name="i-ph-sign-out-light" size="20px"/>
							<div>Logout</div>
						</nuxt-link>

					</div>
				</div>
				</div>
		</USlideover >
</header>

</template>

<script setup>

	const { loggedIn, user, clear } = useUserSession()

	const navigation = [
		{ name: 'News', href: '/blog' },
		{ name: 'Reviews', href: '/reviews' },
		{ name: 'Gear', children: [
			{
				name: 'In-Ear monitors', href: '/iems',
			},
			{
				name: 'Digital audio players', href: '/daps',
			},
			{
				name: 'DAC & AMP dongles', href: '/dacs',
			}	
		]},
		{ name: 'Upcoming', href: '/upcoming' },
	]
  
  	const mobileMenuOpen = ref(false)

  	const colorMode = useColorMode()


	const setColorMode = (value) => {
		colorMode.preference = value
	}

	const query = ref()
	const search = async () => {
		mobileMenuOpen.value = false
		await navigateTo(`/search/${query.value}`)
	}

	const logout = async () => {
		await clear()

		window.location.href="/"
	}
	


</script>
