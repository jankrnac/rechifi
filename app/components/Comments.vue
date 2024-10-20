<template>

<div class="w-full max-w-app mx-auto mb-24">

    <div class="mt-24">
        <UChip :text="comments.length" size="3xl" color="teal" :show="comments.length > 0">
            <h2 class="font-black text-xl text-center md:text-left mb-6">Comments</h2>
        </UChip>

        <ul v-if="comments.length" class="mb-12 mt-6 flex flex-col gap-3 relative">
            <li v-for="comment in useCreateTree(comments)" class="relative">
                <CommentChild 
                    :comment="comment" 
                />
            </li>
        </ul>

        <div>
            <div v-if="user" class="text-sm mb-1 text-gray-500">Commenting as 
                <span  class="font-semibold">{{ user.username }}</span>
            </div>
            <UTextarea class="w-full mb-2" :rows="4" v-model="text"></UTextarea>
        </div>
        
        <div class="flex justify-end">
            <UButton v-if="user" color="sky" @click="addComment" :loading="loading" :disabled="!text">Add comment</UButton>
            <nuxt-link v-else :to='"/login?redirect="+useRoute().fullPath+"#comments"'>
                <UButton color="gray" variant="soft">Login to comment</UButton>
            </nuxt-link>
        </div>
    </div>
</div>
</template>

<script setup>
const { $listen } = useNuxtApp()

const props = defineProps({
        post: {
            type: Object
        },
        product: {
            type: Object
        }
})

let column
let id

if (props.post)
{
    column = 'postId'
    id = props.post.id
}
else if (props.product)
{
    column = 'productId'
    id = props.product.id
}

const { data:comments } = await useFetch(`/api/comments/`, {
    query: {
        [column]: id
    },
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
    }
    
    if (props.post)
    {
        commentPayload['postId'] = id
    }
    else 
    {
        commentPayload['productId'] = id

    }


    const comment = await $fetch(`/api/comments/`, {
        method: "POST",
        body: commentPayload
    })

    comment.user = {
        username: user.value.username
    }

    comment.likes = []

    comments.value.unshift(comment)
    loading.value = false

}


$listen('comment', async (reply) => {

    var replyPayload =   {
        text: reply.text,
        userId: user.value.id,
        parentId: reply.parentId,
    }
    
    if (props.post)
    {
        replyPayload['postId'] = id
    }
    else 
    {
        replyPayload['productId'] = id

    }


    const comment = await $fetch(`/api/comments/`, {
        method: "POST",
        body: replyPayload
    })

    comment.user = {
        username: user.value.username
    }

    comment.likes = []

    comments.value.unshift(comment)
    loading.value = false

})

$listen('edit', async (comment) => {

    await $fetch('/api/comments/' + comment.id, {
        method: "PUT",
        body: comment
    })
})

$listen('addLike', async (comment) => {

    const like = await $fetch('/api/likes', {
        method: "POST",
        body: {
            commentId: comment.id,
            userId: comment.userId
        }
    })

    comments.value.find(e => e.id == comment.id).likes.push(like)

})

$listen('removeLike', async (comment) => {

    const like = comment.likes.find(e=>e.userId == user.value.id)

    await $fetch('/api/likes/' + like.id, {
        method: "DELETE",
    })

    comment.likes.splice(comment.likes.findIndex(l => l.id == like.id),1)
})

$listen('delete',  async (comment) => {
    comments.value.splice(comments.value.findIndex(e => e.id == comment.id), 1)

    await $fetch('/api/comments/' + comment.id, {
        method: "DELETE"
    })
})


</script>