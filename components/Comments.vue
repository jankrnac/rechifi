<template>
    <div class="mt-24">

        <h2 class="font-bold text-3xl mb-6">Comments</h2>
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
            <div class="text-sm mb-1 text-gray-500">Commenting as <span class="font-semibold">{{ profile.username }}</span></div>
            <textarea class="w-full border border-gray-300 rounded-lg focus:outline-none p-4" rows="4" v-model="text"></textarea>
        </div>
        <div class="flex justify-end">
            <Button color="blue" @click="addComment">Add comment</Button>
        </div>
    </div>
</template>

<script setup>

const user = useSupabaseUser()
const client = useSupabaseClient()

const { data:profile } = await useFetch('/api/users/' + user.value.id)

const { data:comments } = await useAsyncData('comments', async () => {
    const { data } = await client.from('comments').select('*, profiles(*), likes(*)')

    return data
})

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