<template>

    <div class="flex w-full flex-1 flex-col justify-center">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Reset your password</h2>
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

        <UAlert
            v-if="resetEmailSent"
            icon="i-ph-envelope-simple"
            color="green"
            variant="solid"
            title="Activation email sent"
            description="Activation link sent. Check your email address."
            class="w-full"
        />
    
        <UForm :schema="schema" :state="state" class="space-y-6" @submit="reset">

            <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" size="xl"/>
            </UFormGroup>
            
            <div>
            <UButton block type="submit" size="xl" :loading="pending">Send reset email</UButton>
            </div>

        </UForm>
            
</div>
            
</div>

</template>
    
<script setup lang="ts">
    import { z } from 'zod'
    
    const schema = z.object({
        email: z.string().email('Invalid email'),
    })
    
    const state = reactive({
          email: undefined,
    })
    
    const resetError = ref()
    
    const pending = ref(false)
    const resetEmailSent = ref(false)

    const reset = async () => {
    
        pending.value = true
        
        const response = await $fetch('/api/auth/remind', {
            method: "POST",
            body: {
                email: state.email,
            }
        }).catch((err) => {
            resetError.value = err.data.statusMessage
    
            pending.value = false
        })
    
        if (response)
        {
            sendEmail(response.token)
            resetEmailSent.value = true
            pending.value = false
        }
    }
    
    const sendEmail = async (token:String) => {
    
        const link = useRequestURL().protocol+'//' + useRequestURL().host+'/reset?code=' + token.value
    
        await $fetch('/mail/send', {
            method: "POST",
            body: {
                from: 'Rechifi<rechifi@rechifi.com>',
                to: state.email,
                subject: 'Reset your password',
                html: `<p'Reset your password using this link:<br/><a href="${link}">${link}<a/></p>`
            }
        })
    }
    
    
    </script>