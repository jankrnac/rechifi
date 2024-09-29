<template>

<div>

<div class="flex w-full mt-2 items-start">
    <div class="mr-4 relative text-gray-500">
        <nuxt-img :src="user.avatar.filename" v-if="user.avatar" name="i-ph-user" width="30" />
        <UIcon v-else name="i-ph-user" class="w-6 h-6" />
    </div>
    <div class="flex-grow">
        <nuxt-link noPrefetch :to="'/users/'+comment.user.username" class="text-xs font-bold mb-2 relative">{{ comment.user.username }}</nuxt-link>
        <div class="text-sm">{{ comment.text }}</div>
        <div class="flex gap-1 mt-2 items-center mb-2">
           
            <UButton size="xs" variant="soft" color="red" v-if="comment.likes.map(e=>e.userId).includes(user.id)" icon="i-ph-heart-fill" @click="dislike(comment)">{{ comment.likes.length }}</UButton>
            <UButton size="xs" variant="soft" color="gray" v-else icon="i-ph-heart" @click="like(comment)">{{ comment.likes.length }}</UButton>

            <UButton size="xs" color="gray" variant="ghost" @click="replyInputId = comment.id">Reply</UButton>
            <UDropdown :items="items">
                <UButton size="xs" variant="ghost" color="gray" trailing-icon="i-ph-caret-down" />
            </UDropdown>
        </div>

        <div v-if="replyInputId == comment.id" class="ml-0">
            <UTextarea class="w-full max-w-[800px] mb-2" :rows="2" v-model="replyText"></UTextarea>
            <div class="flex gap-2 justify-end max-w-[800px]">
                <UButton size="xs" color="red" @click="replyInputId = false">Cancel</UButton>
                <UButton size="xs" @click="addReply(comment.id)">Reply</UButton>
            </div>
        </div>
    </div>
</div>

<ul>
    <li v-for="child in comment.children" class="ml-8 relative">
        <CommentChild :comment="child" @delete="deleteComment"/>
    </li>
</ul>

</div>

</template>

<script setup>

const { user } = useUserSession()

const props = defineProps({
    comment: {
        type: Object
    }
})

const replyInputId = ref(null)
const replyText = ref()

const emit = defineEmits(['comment', 'like', 'dislike', 'delete', 'edit'])

const addReply = async (id) => {

    const commentPayload =   {
        text: replyText.value,
        userId: user.value.id,
        parentId: id
    }

    const comment = await $fetch(`/api/comments/${model}`, {
        method: "POST",
        body: commentPayload
    })

    emit('comment', comment)

    replyInputId.value = null
    replyText.value = null
}

const guest = useCookie('guest')

guest.value = guest.value || Math.random().toString(36).slice(2, 14)

const like = async (comment) => {

    user ? like['userId'] = user.value.id : guest.value

    const likeReponse = await $fetch('/api/likes/' + comment.id, {
        method: "POST",
        body: { 
            'userId': user.value.id,
            'commentId': comment.id
        }
    })

    emit('like', {
        comment: comment,
        like: likeReponse
    })
}

const dislike = async (comment) => {

    user ? like['profile_id'] = user.value.id : guest.value

    await $fetch('/api/likes', {
        method: "DELETE",
        body: {
            userId: user.value.id,
            commentId: comment.id
        }
    })

    emit('dislike', {
        comment: comment,
        like: like
    })
}



const deleteComment = async (comment) => {
    await client.from('comments').delete().eq('id', comment.id)

    emit('delete', comment)
}

const items = [
    [{
    label: 'Edit',
    icon: 'i-ph-pencil'
  }], [{
    label: 'Delete',
    icon: 'i-ph-trash',
    shortcuts: ['⌘', 'D'],
    click: () => {
        emit('delete', props.comment)
    }
  }]
]

</script>