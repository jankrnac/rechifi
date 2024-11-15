<template>
<div class="mb-6 md:mb-12 w-full max-w-app">
    <div class="flex-col md:flex-row flex w-full justify-between">
        <div></div>
        <div>
            <h1 class="text-center text-2xl lg:text-4xl font-bold mt-12 mb-2">
                {{product.title}}
            </h1>

            <div v-if="product.releaseDate" class="text-center text-gray-500 text-sm md:text-base">Release date: <b class="font-semibold">{{ new Date(product.releaseDate).toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric'}) }}</b></div>

            <div v-if="product.priceRange" class="pointer-events-none flex mt-4 justify-center">
                <UIcon name="i-ph-currency-dollar-simple-bold" size="20px" :class="[product.priceRange == 'low' || product.priceRange == 'medium' || product.priceRange == 'high' ? 'text-blue-500' : 'text-gray-300']" />
                <UIcon name="i-ph-currency-dollar-simple-bold" size="20px" :class="[product.priceRange == 'medium' ||  product.priceRange == 'high'  ? 'text-blue-500' : 'text-gray-300']" />
                <UIcon name="i-ph-currency-dollar-simple-bold" size="20px" :class="[product.priceRange == 'high' ? 'text-blue-500' : 'text-gray-300']" />
            </div>

        </div>

        <div class="self-center mt-6 md:mt-0 md:self-end">
            <UButton 
                size="lg" 
                variant="soft" 
                color="red" 
                v-if="(loggedIn && likes.map(e=>e.userId).includes(user.id) || !loggedIn && likes.map(e=>e.guestId).includes(guest))" 
                icon="i-ph-heart-fill" 
                @click="removeLike(product)"
                :disabled="loading"
            >
                {{ likes.length }}
            </UButton>

            <UButton v-else size="lg" variant="soft" color="gray" icon="i-ph-heart" :disabled="loading" @click="addLike(product)">{{ likes.length }}</UButton>      
           
            <Can :ability="editProduct">
                <UButton :to="'/products/'+product.id+'/edit'" size="lg" icon="i-ph-pencil" class="ml-2" :disabled="loading">Edit</UButton>
            </Can>
            
        </div>

    </div>

</div>
</template>

<script setup>

const { loggedIn, user } = useUserSession()

const loading = ref(false)
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const guest = useCookie('guest')
guest.value = guest.value || Math.random().toString(36).slice(2, 14)

const likes = ref(props.product.likes)
    
const addLike = async () => {
    loading.value = true
    const bodyPayload = {
        productId: props.product.id
    }

    if (loggedIn.value)
    {
        bodyPayload['userId'] = user.value.id
    }
    else
    {

        bodyPayload['guestId'] = guest.value
    }

    const like = await $fetch('/api/likes/', {
        method: "POST",
        body: bodyPayload
    })

    likes.value.push(like)
    loading.value = false

}


const removeLike = async () => {
    
    loading.value = true

    let like
    
    if (loggedIn.value)
    {
        like = likes.value.find(e=>e.userId == user.value.id)
    }
    else
    {
        like = likes.value.find(e=>e.guestId == guest.value)
    }

    await $fetch('/api/likes/' + like.id, {
        method: "DELETE",
    })

    likes.value.splice(likes.value.findIndex(l => l.id == like.id),1)

    loading.value = false

}

</script>