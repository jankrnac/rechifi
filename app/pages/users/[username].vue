<template>

<div class="flex flex-col gap-12 mt-12 w-full max-w-app mb-24">
    <div class="flex flex-col items-center">
        <div><Icon name="ph:user-thin" class="w-24 h-24 mb-8" /></div>
        <h1 class="font-bold text-5xl ">{{ profile.username }}</h1>
    </div>
    <h2 class="font-bold text-2xl">Audio gear</h2>
        <ul class="grid grid-cols-5 gap-2">
            <ProductBox v-for="iem in iems" :product="iem" />
            <ProductBox v-for="dap in daps" :product="dap" />
            <ProductBox v-for="dac in dacs" :product="dac" />
        </ul>
    <h2 class="font-bold text-2xl">Reviews</h2>
    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">
        
        <div v-for="review in reviews" class="relative">

            <ReviewBox :review="review" />

        </div>
    </div>
</div>

</template>

<script setup>

const client = useSupabaseClient()

const { data:profile } = await client.from('profiles').select('*').eq('username',useRoute().params.username).single()

const { data:reviews } = await useAsyncData(async () => {
    const { data } = await client.from('reviews').select('*, profiles(username)').eq('profile_id', profile.id).order('created_at')

    return data
})

const { data:iems } = await useAsyncData( async () =>  
{   
    if(profile.iems && profile.iems.length)
    {
        const iems = []
        for (const iem of profile.iems)
        {
            iems.push(await queryContent(iem).findOne())
        }

        return iems
    }
})

const { data:daps } = await useAsyncData( async () =>  
{   
    if(profile.daps && profile.daps.length)
    {
        const daps = []
        for (const dap of profile.daps)
        {
            daps.push(await queryContent(dap).findOne())
        }

        return daps
    }
})


const { data:dacs } = await useAsyncData( async () =>  
{   
    if(profile.dacs && profile.dacs.length)
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