<template>

<div class="flex flex-col items-center justify-center max-w-[1200px]  text-xl font-light py-24">

    <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-24">
        <span class="font-bold">Suggest </span> 
        <span class="font-playfair">gear</span>
    </h1>

<p class="text-center">Missing some piece of audio equipment in our databases? <br/>Let us know and we will add it right away.</p>

<UAlert
    v-if="sent"
    class="mt-12"
    icon="i-ph-hands-praying"
    color="green"
    variant="solid"
    title="Thank you!"
    description="Your suggestion will help to make this site even more awesome."
  />

<UForm :schema="schema" :state="state" class="mt-12 space-y-4 w-full max-w-[300px]" @submit="onSubmit">

    <UFormGroup label="Brand" name="brand">
      <UInput v-model="state.brand" size="xl"/>
    </UFormGroup>

    <UFormGroup label="Model" name="model">
      <UInput v-model="state.model" size="xl"/>
    </UFormGroup>

    <UButton type="submit" block size="xl" :disabled="!(state.brand && state.model)" :loading="loading">Submit</UButton>
  </UForm>

</div>

</template>

<script setup>

useSeoMeta({
    title: 'Suggest gear',
    description: `Missing some piece of audio equipment in our databases? Let us know and we will add it right away. Your suggestion will help to make this site even more awesome.`
})

import { z } from 'zod'

const schema = z.object({
  brand: z.string(),
  model: z.string()
})


const state = reactive({
  email: undefined,
  password: undefined
})

const loading = ref(false)
const sent = ref(false)

const onSubmit = async (event) => {

    loading.value = true

    await $fetch('/mail/send', {
        method: "POST",
        body: {
            from: 'Rechifi<rechifi@rechifi.com>',
            to: 'Rechifi<rechifi@rechifi.com>',
            subject: 'Gear suggest',
            html: `<p>Brand: ${state.brand}<br/>Model: ${state.model}</p>`
        }
    })

    loading.value = false

    sent.value = true
    state.model = undefined
    state.brand = undefined

}



</script>