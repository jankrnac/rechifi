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
                <span  class="font-semibold">{{ user.username }}</span>
            </div>
            <textarea class="w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none p-4 dark:bg-gray-800" rows="4" v-model="text"></textarea>
        </div>
        <div class="flex justify-end">
            <UButton v-if="user" color="sky" @click="addComment" :loading="loading">Add comment</UButton>
            <nuxt-link v-else :to='"/login?redirect="+useRoute().fullPath+"#comments"'>
                <UButton color="gray">Login to comment</UButton>
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['post'])

let model
if (useRoute().path.includes('blog'))
{
    model = 'posts'
}

const { data:comments } = await useFetch(`/api/comments/${model}/${props.post.id}`, {
    deep: true
})
const { user } = useUserSession()

const text = ref()
const loading = ref(false)

const addComment = async () => {

    loading.value = true
    var commentPayload =   {
        text: text.value,
        userId: user.value.id,
        postId: props.post.id
    }

    const comment = await $fetch(`/api/comments/${model}`, {
        method: "POST",
        body: commentPayload
    })

    comment.user = {
        username: user.value.username
    }

    comment.likes = []

    comments.value.push(comment)
    loading.value = false

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