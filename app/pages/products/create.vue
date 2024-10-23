<template>

<div class="flex w-full max-w-app justify-center py-12">
<UForm :state="state" class="space-y-4 w-full max-w-[500px]" @submit="onSubmit">

    <UFormGroup label="Brand" name="brand">
        <USelectMenu searchable v-model="state.brand"  :options="brands" value-attribute="value" />
    </UFormGroup>
  
    <UFormGroup label="Model" name="model">
        <UInput v-model="state.model" />
    </UFormGroup>

    <UFormGroup label="Type" name="type">
        <USelectMenu v-model="state.type" :options="types" />
    </UFormGroup>

    <UFormGroup label="Release Date" name="releaseDate">
        <UInput v-model="state.releaseDate" />
    </UFormGroup>

    <UCheckbox v-model="state.released" name="released" label="Released" />
    <UCheckbox v-model="state.showInIndex" name="showInIndex" label="Show in index" />

    <UFormGroup label="Drivers" name="drivers">
        
        <div class="flex items-center space-y-1" v-for="driver in driverTypes">
            <UCheckbox class="w-[120px]" :label="driver" @input="check($event, driver)" />
            <UInput class="w-20" @change="changeDriverCount($event, driver)" />
        </div>

    </UFormGroup>

    <UButton type="submit" size="xl">Submit</UButton>
</UForm>

</div>
</template>

<script setup>



const state = reactive({
    brand: undefined,
    model: undefined,
    type: undefined,
    released: true,
    releaseDate: undefined,
    showInIndex: true,
    drivers: []
})

const check = (event, data) => {
    if (event.target.checked)
    { 
        state.drivers.push({
            value: data,
            qty: 1
        })
    }
    else
    {
        state.drivers.splice(state.drivers.findIndex(e=>e.value == data),1)
    }
}

const changeDriverCount = (value, data) => {
    const a = state.drivers.find(e=>e.value == data)
    a.qty = value
}

const onSubmit = async (event) => {

    state.title = state.brand.charAt(0).toUpperCase() + state.brand.slice(1) + ' ' + state.model
    state.slug = useSlug(state.brand) + '/' + useSlug(state.model)

    await $fetch('/api/products', {
        method: "POST",
        body: state
    })

    await navigateTo('/products')
}

const types = ['iems', 'daps', 'dacs']
const { data:brands } = await useFetch('/api/brands')
const { data:driverTypes } = await useFetch('/api/drivers')

</script>

