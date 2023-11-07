<template>

<header>
    <nav class="flex items-center p-6 lg:px-8" aria-label="Global">

        <!-- Mobile only -->
        <div class="flex lg:hidden">
                <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5" @click="mobileMenuOpen = true">
                    <span class="sr-only">Open main menu</span>
                    <IconsHamburger class="w-8 h-8"/>
                </button>
        </div>

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
          <nuxt-link v-for="item in navigation" :key="item.name" :to="item.href" class="text text-base leading-6">{{ item.name }}</nuxt-link>
        </div>

        <!-- Search -->
        <div class="flex flex-1 mr-24   ">
            <input class="bg-gray-50 p-3 rounded-lg border w-full dark:bg-gray-800 dark:border-gray-700" type="text" />
        </div>

        <!-- Right header -->
        <div class="hidden lg:flex lg:justify-end">
			<ClientOnly>
				<IconsSun v-if="colorMode.preference == 'dark'" class="w-6 h-6 mr-5 cursor-pointer"  @click="setColorMode('light')"/>
				<IconsMoon v-else class="w-6 h-6 cursor-pointer mr-5"  @click="setColorMode('dark')"/>
			</ClientOnly>
			<IconsUser class="w-6 h-6" />
        </div>

      </nav>

</header>

</template>
  
<script setup>

	import { Dialog, DialogPanel } from '@headlessui/vue'

	const navigation = [
		{ name: 'Domů', href: '/' },
		{ name: 'Články', href: '/blog' },
		{ name: 'Recenze', href: '#' },
		{ name: 'Výrobci', href: '#' },
	]
  
  	const mobileMenuOpen = ref(false)

  	const colorMode = useColorMode()


	const setColorMode = (value) => {
		colorMode.preference = value
	}

  </script>