<template>

<header class="bg-white">
    <nav class="flex items-center p-6 lg:px-8" aria-label="Global">

        <!-- Mobile only -->
        <div class="flex lg:hidden">
                <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
                    <span class="sr-only">Open main menu</span>
                    <IconsHamburger class="w-8 h-8"/>
                </button>
        </div>

        <div class="flex">
          <nuxt-link to="/">
            <span class="sr-only">Your Company</span>
            <Logo class="w-12 h-12"/>
          </nuxt-link>
        </div>

   
        <!-- Navigation links -->
        <div class="hidden lg:flex lg:gap-x-12 mx-24">
          <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-base leading-6 text-gray-900">{{ item.name }}</a>
        </div>

        <!-- Search -->
        <div class="flex flex-1 mr-24   ">
            <input class="bg-gray-50 p-3 rounded-lg border w-full" type="text" />
        </div>

        <!-- Right header -->
        <div class="hidden lg:flex lg:justify-end">
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in</a>
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
  </script>