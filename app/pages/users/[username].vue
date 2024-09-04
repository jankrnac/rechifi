<template>

<div class="flex flex-col gap-12 mt-12 w-full max-w-app mb-24">
    <div class="flex flex-col items-center">
        <div><Icon name="ph:user-thin" class="w-24 h-24 mb-8" /></div>
        <h1 class="font-bold text-5xl ">{{ user.username }}</h1>
    </div>
    <h2 class="font-bold text-2xl">Audio gear</h2>
        {{ profile }}
    <h2 class="font-bold text-2xl">Reviews</h2>
    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">
        
        <div v-for="review in reviews" class="relative">

            <ReviewBox :review="review" />

        </div>
    </div>
</div>

</template>

<script setup>

const { user } = useUserSession()

const { data:profile } = await useFetch('/api/users/' + user.value.id)

const iems = await useAsyncData( async () =>  
{   
    if(profile.value.iems && profile.value.iems.length)
    {
        const iems = []
        for (const iem of profile.value.iems)
        {
            iems.push(await queryContent(iem).findOne())
        }

        return iems
    }
})

const { data:daps } = await useAsyncData( async () =>  
{   
    if(profile.value.daps && profile.value.daps.length)
    {
        const daps = []
        for (const dap of profile.value.daps)
        {
            daps.push(await queryContent(dap).findOne())
        }

        return daps
    }
})


const { data:dacs } = await useAsyncData( async () =>  
{   
    if(profile.value.dacs && profile.value.dacs.length)
    {
        const dacs = []
        for (const dac of profile.dacs)
        {
            dacs.push(await queryContent(dac).findOne())
        }

        return dacs
    }
})

</script>