<template>

    <div class="flex-1">
      
        <div class="border-y dark:border-gray-700 py-2 lg:p-5 mb-2">
    
            <div class="max-w-app mx-auto flex justify-between gap-2">
                <UButton  v-if="user && post.userId == user.id" :to="useRoute().path + '/edit'" icon="i-ph-pencil-simple">
                    Edit
                </UButton>
                
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
        
        </div>
    
    </div>
    
</template>
    
<script setup>
    
    const { user } = useUserSession()

    const props = defineProps({
        post: {
            type: Object,
            required: true
        }
    })
        
</script>