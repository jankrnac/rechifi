<template>
    
<div class="max-w-app mx-auto flex-1 flex flex-col items-center justify-center">

    <template v-if="user.username == user.email">
        <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

            <h2 class="text-lg mb-4">We need to know your username first</h2>
            <UFormGroup label="Username" name="username">
                <UInput size="xl" block v-model="state.username" @change="checkUsername"/>
            </UFormGroup>

            <UButton type="submit">Save username</UButton>
            
        </UForm>
    </template>

    <template v-else>

        <ul class="flex gap-6 lg:gap-12 mb-16">
            <li><IconsIem class="w-20 h-20 lg:w-32 lg:h-32 cursor-pointer" :class="[type == 'iem' ? 'opacity-100' : 'opacity-40']" @click="type = 'iem'"/></li>
            <li><IconsDap class="w-20 h-20 lg:w-32 lg:h-32 cursor-pointer" :class="[type == 'dap' ? 'opacity-100' : 'opacity-40']" @click="type = 'dap'" /></li>
            <li><IconsDac class="w-20 h-20 lg:w-32 lg:h-32 cursor-pointer" :class="[type == 'dac' ? 'opacity-100' : 'opacity-40']" @click="type = 'dac'" /></li>
        </ul>

        <ul class="mb-12">
            <li v-for="error in errors" class="bg-red-100 rounded-lg px-5 py-4">
                {{ error }}
            </li>
        </ul>

        <h1 class="text-3xl font-bold mb-6">Choose {{ type }} model</h1>

        <USelectMenu
            v-if="!manualMode"
            v-model="headphone"
            size="xl"
            searchable
            :searchable-placeholder="'Search '+type"
            class="w-full max-w-[500px]"
            :placeholder="'Select ' + type.toUpperCase()"
            :options="allGear"
            :search-attributes="['model', 'brand']"
        >

            <template #option="{ option }">
                <span class="capitalize">{{ option.brand + ' ' + option.model }}</span>
            </template>

        </USelectMenu>



        <div v-else class="mt-6">
            <div class="font-semibold">Brand</div>
            <input v-model="brand" type="text" class="border rounded-lg px-5 py-4 w-[400px] text-sm dark:bg-gray-800 dark:border-gray-600 focus:outline-none" placeholder="Type the brand and model name"/>

            <div class="font-semibold mt-6">Model</div>
            <input v-model="model" type="text" class="border rounded-lg px-5 py-4 w-[400px] text-sm dark:bg-gray-800 dark:border-gray-600 focus:outline-none" placeholder="Type the brand and model name"/>

        </div>

        <div v-if="!manualMode" class="text-sm mt-5 cursor-pointer flex items-center" @click="manualMode = true">Item not in list?
            <UButton size="sm" color="gray" variant="outline" class="ml-4">Enter manually</UButton>
        </div>
        <UButton v-else size="sm" color="gray" variant="outline" class="mt-4" @click="manualMode = false">Choose from list</UButton>

        <UButton
            class="mt-6"
            size="xl"
            :disabled="!(headphone || (model && brand))" 
            @click="save"
            :loading="loading"
        >
            Create review
    </UButton>

    </template>
</div>

</template>

<script setup>

import { z } from 'zod'

definePageMeta({
    middleware: ['auth']
});

const { user, fetch:fetchSession } = useUserSession()

const username = ref(user.value.username)

const manualMode = ref(false)
const headphone = ref()

const brand = ref()
const model = ref()

const type = ref('iem')
const { data:allGear } = await useAsyncData(type.value, () => queryContent(type.value).find(), { 
	watch: [type]
})

const errors = ref([])

const loading = ref(false)

const schema = z.object({
  username: z.string().min('3'),
})

const state = reactive({
    username: undefined,
})

const checkUsername = async () => {
    const check = await $fetch('/api/users/checkusername/' + state.username)

    if (check.length > 0) form.value.setErrors({a:1})
}

const onSubmit = async () => {
    
    loading.value = true
    
    const result = await $fetch('/api/users/'+ user.value.id, {
        method: "PUT",
        body: {
            username: state.username
        }
    })

    await $fetch('/api/auth', {
        method: "PUT",
        body: {
            username: state.username
        }
    })

    fetchSession()
    
}

const save = async () => {

    
    const slug = Math.random().toString(36).substring(2,9)

    if (!manualMode.value)
    {
        const check = await $fetch('/api/reviews/check', {
            method: "POST",
            body: {
                brand: headphone.value.brand,
                model: headphone.value.model,
                userId: user.value.id
            }
        })

        if (check && check.length)  
        {
            errors.value.push('You already wrote a review for this IEM')
        }
    }

    if (!errors.value.length)
    {

        if (headphone.value || (brand.value && model.value))
        {
            
            const brandPayload = manualMode.value ? useSlug(brand.value) : useSlug(headphone.value.brand)
            const modelPayload = manualMode.value ? useSlug(model.value) : useSlug(headphone.value.model)
            const productTitle = manualMode.value ? useSlug(brand.value + ' ' + model.value) : headphone.value.title

            await $fetch('/api/posts', {
                method: "POST",
                body: {
                    title: brandPayload + ' ' + modelPayload,
                    slug: slug,
                    brand: brandPayload,
                    model: modelPayload,
                    type: 'review',
                    userId: user.value.id,
                    gearType: type.value
                }
            })

            await navigateTo(`/reviews/${username.value}/${brandPayload}/${modelPayload}/edit`)
        }
    }
}


</script>