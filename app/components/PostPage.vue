<template>

    <div class="flex-1">
      
        <div v-if="user && post.userId == user.id" class="border-y dark:border-gray-700 py-2 lg:p-5 mb-2">
    
            <div class="max-w-app mx-auto flex gap-2">
                <UButton :to="useRoute().path + '/edit'" icon="i-ph-pencil-simple">
                    Edit
                </UButton>
    
            </div>
        </div>
    
        
        <div class="w-full max-w-app mx-auto mb-24">
    
            <Layout :elements="post.elements" />
    
            <LazyComments :comments="post.comments" />
    
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