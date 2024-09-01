<template>
    <div class="mt-24">

        <h2 class="font-black text-4xl mb-6">Comments</h2>
        <ul class="mb-12 flex flex-col gap-3 relative">
            <li v-for="comment in useCreateTree(comments)" class="relative">
                <CommentChild 
                    :comment="comment" 
                    @comment="addReply"
                    @like="addLike"
                    @dislike="removeLike"
                    @delete="deleteComment"
                />
            </li>
        </ul>
        <div>
            <div v-if="user" class="text-sm mb-1 text-gray-500">Commenting as 
                <span  class="font-semibold">{{ profile.username }}</span>
            </div>
            <textarea class="w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none p-4 dark:bg-gray-800" rows="4" v-model="text"></textarea>
        </div>
        <div class="flex justify-end">
            <UButton v-if="user" color="sky" @click="addComment">Add comment</UButton>
            <nuxt-link v-else :to='"/login?redirect="+useRoute().fullPath+"#comments"'>
                <UButton color="gray">Login to comment</UButton>
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    comments: {
        type: Array,
        required: true
    }
})
const { user } = useUserSession()

const profile = ref()

if(user.value) 
{
    profile.value = await $fetch('/api/users/' + user.value.id )
}


const text = ref()

const addComment = async () => {

    var commentPayload =   {
        text: text.value,
        profile_id: user.value.id,
    }

    const {data:comment}  = await client.from('comments').insert(commentPayload).select().single()

    comment.profiles = {
        username: profile.value.username
    }

    comment.likes = []

    comments.value.push(comment)
    
}


const addReply = async (reply) => {

    reply.profiles = {
        username: profile.value.username
    }
    reply.likes = []
    comments.value.push(reply)

}

const addLike = async (data) => {
    comments.value.find(e => e.id == data.comment.id).likes.push(data.like)
}

const removeLike = async (data) => {
    const comment = comments.value.find(e => e.id == data.comment.id)
    comment.likes.splice(comment.likes.findIndex(l => l.id == data.like.id),1)
}

const deleteComment = (comment) => {
    comments.value.splice(comments.value.findIndex(e => e.id == comment.id), 1)
}


</script>