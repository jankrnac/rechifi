<template>

<div class="flex min-h-full flex-1 flex-col justify-center px-6 py-24 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    	<form class="space-y-6" action="#" method="POST" @submit.prevent="login">
        	<div>
            	<label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            	<div class="mt-2">
              		<input v-model="email" id="email" name="email" type="email" autocomplete="email" required="true" class="block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset
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
              		<input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="true" class="block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset 
              		ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
            	</div>
          	</div>
			
          	<div>
            	<button type="submit" class="flex w-full justify-center rounded-md bg-blue-400 px-4 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500">Sign in</button>
          	</div>

			<div class="text-center">
				<nuxt-link to="/signup" class="text-sm">Not a member? <b class="font-semibold">Sign up</b></nuxt-link>
			</div>
        </form>
    </div>
</div>

</template>
  
<script setup lang="ts">

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

</script>