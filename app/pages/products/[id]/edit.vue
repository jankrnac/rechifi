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
    
        <UFormGroup label="Price Range" name="priceRange">
            <USelectMenu v-model="state.priceRange" :options="['low','medium','high']" />
        </UFormGroup>


        <UFormGroup label="Release Date" name="releaseDate">
            <UInput v-model="state.releaseDate" />
        </UFormGroup>
        
        <UCheckbox v-model="state.released" name="released" label="Released" :checked="true" />
        <UCheckbox v-model="state.showInIndex" name="showInIndex" label="Show in index" />
    
        <UFormGroup label="Drivers" name="drivers">
            
            <div class="flex items-center space-y-1" v-for="driver in driverTypes">
                <UCheckbox class="w-[120px]" :label="driver" :name="driver" :id="driver" @input="check($event, driver)" v-model="activeDrivers[driver]" />
                <UInput class="w-20" v-model="activeDriverCounts[driver]" @change="changeDriverCount($event, driver)"/>
            </div>
    
        </UFormGroup>
    
        <UButton type="submit" size="xl">Submit</UButton>
    </UForm>
    
    </div>
    </template>
    
<script setup>
    
    const { data:product } = await useFetch('/api/admin/products/'+useRoute().params.id)

    const state = reactive({
        brand: product.value.brand,
        model: product.value.model,
        type: product.value.type,
        released: product.value.released,
        releaseDate: product.value.releaseDate,
        showInIndex: product.value.released,
        priceRange: product.value.priceRange,
        drivers: product.value.drivers
    })

    const activeDrivers = ref({})
    const activeDriverCounts = ref({})

    for (const driver of product.value.drivers)
    {
        activeDrivers.value[driver.value] = true
        activeDriverCounts.value[driver.value] = driver.qty

    }

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
    
        await $fetch('/api/admin/products/'+useRoute().params.id, {
            method: "PUT",
            body: state
        })
    
        await navigateTo('/products')
    }
    
    const types = ['iems', 'daps', 'dacs']
    const { data:brands } = await useFetch('/api/brands')
    const { data:driverTypes } = await useFetch('/api/drivers')
    
    </script>
    
    