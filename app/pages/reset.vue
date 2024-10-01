<template>

    <div class="flex w-full flex-1 flex-col justify-center">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Choose your new password</h2>
        </div>
    
        <div class="my-10 sm:mx-auto sm:w-full sm:max-w-sm">

                
        <UAlert
            v-if="resetError"
            icon="i-ph-user-focus"
            color="red"
            variant="solid"
            :title="resetError"
            class="w-full mb-6"
        >
    
            <template #actions>
                <UButton to="/signup" external v-if="resetError == 'Account not found'" size="xs" color="white">Signup</UButton>    
            </template>
        
        </UAlert>
    
        <UForm :schema="schema" :state="state" class="space-y-6" @submit="reset">

            <UFormGroup label="Password" name="password">
                <UInput v-model="state.password" size="xl" type="password" />
            </UFormGroup>
            
            <UButton block type="submit" size="xl" :loading="pending" :disabled="!state.password">Reset password</UButton>

        </UForm>
            
</div>
            
</div>

</template>
    
<script setup lang="ts">

    definePageMeta({
        middleware: ["reset-token"]
    })

    import { z } from 'zod'
    
    const schema = z.object({
        password: z.string().min(5, 'Must be at least 5 characters')
    })
    
    const state = reactive({
        password: undefined,
    })
    
    const resetError = ref()
    
    const pending = ref(false)

    const reset = async () => {
    
        pending.value = true
        
        const response = await $fetch('/api/auth/reset', {
            method: "POST",
            body: {
                password: state.password,
                token: useRoute().query.code
            }
        }).catch((err) => {
            resetError.value = err.data.statusMessage
    
            pending.value = false
        })
    
        if (response)
        {
            pending.value = false
            navigateTo('/', {external: true})
        }
    }
    
</script>