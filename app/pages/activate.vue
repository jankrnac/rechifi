<template>

    <div v-if="success" class="flex w-full flex-1 flex-col items-center justify-center">
        <UAlert
        icon="i-heroicons-check"
        color="green"
        variant="solid"
        title="Account activated"
        description="You can now login and enjoy!"
        class="w-[530px]"
    />
    </div>

    <div v-if="error" class="flex w-full flex-1 flex-col items-center justify-center">
        <UAlert
        icon="i-heroicons-x-mark"
        color="red"
        variant="solid"
        title="Something went wrong"
        description="You can resend the activation code again below."
        class="w-[530px]"
    >

        <template #actions>
            <UButton size="sm" color="white" @click="resend">Resend</UButton>
        </template>
    </UAlert>
    
</div>

</template>

<script setup>

const success = ref(false)
const error = ref(false)

const code = useRoute().query.code

const { data:token } = await useFetch('/api/tokens/' + code)

if (token.value)
{
    await $fetch('/api/users/' + token.value.userId, {
        method: "PUT",
        body: {
            activated: true
        }
    })

    success.value = true
}
else
{
    error.value = true
}

const resend = async () => {
    $fetch('/api/tokens/resend')
}

</script>