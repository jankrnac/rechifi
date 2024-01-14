<template>
    <!-- Global notification live region, render this permanently at the end of the document -->
    <div aria-live="assertive" class="pointer-events-none fixed bottom-0 inset-x-0 flex items-end px-4 py-4 sm:items-start sm:p-6 z-[200]">
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
        <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <div v-if="visible" class="pointer-events-auto w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="p-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <IconsCookie class="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="text-sm font-semibold text-gray-900">Cookies</p>
                  <p class="mt-1 text-sm text-gray-500">This website collects cookies to deliver better user experience. We collect cookies to analyze our website traffic and performance; we never collect any personal data.</p>
                  <div class="mt-3 flex space-x-2">
                    <button type="button" class="rounded-md border px-2 py-1 text-sm font-medium" @click="confirm">Accept</button>
                    <nuxt-link to="/cookies" class="rounded-md border px-2 py-1 text-sm font-medium">Read more</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
</template>
  
<script setup>  
    const cookie = useCookie('cookieConsent', {maxAge: 31536000 })

	const visible = ref(!cookie.value)

	const confirm = () => {
		cookie.value = true
		visible.value = false
	}


</script>