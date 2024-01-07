<template>

<div class="flex w-full flex-1 flex-col justify-center px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    	<form class="space-y-6" action="#" method="POST" @submit.prevent="login">
        	<div>
            	<label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            	<div class="mt-2">
              		<input v-model="email" id="email" name="email" type="email" autocomplete="email" :required="true" class="block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset
               		ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
            	</div>
          	</div>
  
          	<div>
            	<div class="flex items-center justify-between">
              		<label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              		<div class="text-sm">
                		<a href="#" class="font-semibold text-gray-500">Forgot password?</a>
              		</div>
            	</div>
            	
				<div class="mt-2">
              		<input v-model="password" id="password" name="password" type="password" autocomplete="current-password" :required="true" class="block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset 
              		ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
            	</div>
          	</div>
			
          	<div>
            	<button type="submit" class="flex w-full justify-center rounded-md bg-blue-400 px-4 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500">Sign in</button>
          	</div>

			<div class="text-center">
				<nuxt-link to="/signup" class="text-sm">Not a member? <b class="font-semibold">Sign up</b></nuxt-link>
			</div>

			<div class="relative">
				<div class="absolute inset-0 flex items-center" aria-hidden="true">
				<div class="w-full border-t border-gray-300" />
				</div>
				<div class="relative flex justify-center">
				<span class="bg-white px-2 text-sm text-gray-500">Or</span>
				</div>
			</div>

			<button type="button" @click="handleSignInWithGoogle" class="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
				<svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
				</svg>Sign in with Google<div></div>
			</button>

        </form>
</div>
		
</div>

</template>
  
<script setup lang="ts">

import crypto from 'crypto'

const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')

const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })

    if (error) {
		
	}
	else
	{
		await navigateTo('/')
	}
}



const handleSignInWithGoogle = () => {
	supabase.auth.signInWithOAuth({
  		provider: 'google',
		options: {
			queryParams: {
				prompt: 'select_account',
			}
		}
	})
}

</script>