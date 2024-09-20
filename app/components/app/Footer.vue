<template>

<footer class="border-t dark:border-gray-800">
    <div class="mx-auto overflow-hidden px-6 py-12 lg:px-8">
      	<nav class="columns-1 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
        	<div v-for="item in navigation.main" :key="item.name" class="pb-6 text-center">
          		<nuxt-link :to="item.href" class="text-sm leading-6 hover:text-gray-900">{{ item.name }}</nuxt-link>
        	</div>
      	</nav>

      	<div class="mt-10 flex justify-center space-x-10">
			<a href="#" class="opacity-50 hover:opacity-100">
				<span class="sr-only">facebook</span>
				<Icon name="ph:facebook-logo" size="34px" aria-hidden="true" />
			</a>
			<a href="#" class="opacity-50 hover:opacity-100">
				<span class="sr-only">facebook</span>
				<Icon name="ph:instagram-logo" size="34px" aria-hidden="true" />
			</a>
			<a href="#" class="opacity-50 hover:opacity-100">
				<span class="sr-only">facebook</span>
				<Icon name="ph:x-logo" size="34px" aria-hidden="true" />
			</a>
		</div>
      	<p class="mt-10 text-center text-xs leading-5">&copy; 2024 Rechifi.com</p>
    </div>

    <Cookies />
</footer>

</template>
  
<script setup>
  
const { locale, locales, setLocale, setLocaleCookie } = useI18n()

watch(locale, (value) => {
	setLocaleCookie(value)
	setLocale(value)
})

const navigation = {
  main: [
  	{ name: 'About us', href: '/about' },	
    { name: 'Privacy policy', href: '/privacy' },
	{ name: 'Suggest gear', href: '/suggest' },
  ]
}

</script>