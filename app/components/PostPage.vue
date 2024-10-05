<template>

    <div class="flex-1">
      
        <div class="border-b md:border-y dark:border-gray-700 py-4 lg:p-5 mb-2">
    
            <div class="max-w-app mx-auto flex justify-between gap-2">
                <div class="flex gap-5 items-center">
                    <UButton v-if="user && post.userId == user.id" :to="useRoute().path + '/edit'" size="lg" icon="i-ph-pencil-simple">
                        Edit
                    </UButton>
                    
                    <div>
                       <UButton 
                            size="lg" 
                            variant="soft" 
                            color="red" 
                            v-if="(loggedIn && likes.map(e=>e.userId).includes(user.id) || !loggedIn && likes.map(e=>e.guestId).includes(guest))" 
                            icon="i-ph-heart-fill" 
                            @click="removeLike(post)"
                        >
                            {{ likes.length }}
                        </UButton>

                        <UButton v-else size="lg" variant="soft" color="gray" icon="i-ph-heart" @click="addLike(post)">{{ likes.length }}</UButton>
                    </div>
                </div>

                <div class="flex space-x-5">
                    <SocialShare network="facebook" :label="false" class="opacity-70 hover:opacity-100"/>
                    <SocialShare network="twitter" :label="false" class="opacity-70 hover:opacity-100"/>
                    <SocialShare network="pinterest" :label="false" class="opacity-70 hover:opacity-100"/>
                    <SocialShare network="reddit" :label="false" class="opacity-70 hover:opacity-100"/>
                    <SocialShare network="telegram" :label="false" class="opacity-70 hover:opacity-100"/>
                </div>

            </div>
        </div>
    
        
        <div class="w-full max-w-app mx-auto mb-24">
    
            <Layout :elements="post.elements" />
    
            <LazyComments :post="post" />
    
        </div>
    
    </div>
    
</template>
    
<script setup>
    
    const { loggedIn, user } = useUserSession()

    const props = defineProps({
        post: {
            type: Object,
            required: true
        }
    })

    const guest = useCookie('guest')
    guest.value = guest.value || Math.random().toString(36).slice(2, 14)

    const likes = ref(props.post.likes)
        
    const addLike = async () => {

        const bodyPayload = {
            postId: props.post.id
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

    }
    

    const removeLike = async () => {
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
    }

</script>