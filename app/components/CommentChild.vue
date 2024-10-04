<template>

<div>

<div class="flex w-full mt-2 items-start">
    <div class="mr-4 relative text-gray-500">
        <nuxt-img :src="comment.user.avatar.filename" v-if="comment.user && comment.user.avatar" name="i-ph-user" width="30" />
        <UIcon v-else name="i-ph-user" class="w-6 h-6" />
    </div>
    <div class="flex-grow">
        <nuxt-link noPrefetch :to="'/users/'+comment.user.username" class="text-xs font-bold mb-2 relative">{{ comment.user.username }}</nuxt-link>
        <div class="text-sm">{{ comment.text }}</div>
        <div class="flex gap-1 mt-2 items-center mb-2">
           
            <UButton 
                size="xs" 
                variant="soft" 
                color="red" 
                v-if="(loggedIn && comment.likes.map(e=>e.userId).includes(user.id) || !loggedIn && comment.likes.map(e=>e.guestId).includes(guest))" 
                icon="i-ph-heart-fill" 
                @click="removeLike(comment)"
            >
                {{ comment.likes.length }}
            </UButton>

            <UButton v-else size="xs" variant="soft" color="gray" icon="i-ph-heart" @click="addLike(comment)">{{ comment.likes.length }}</UButton>

            <UButton v-if="loggedIn" size="xs" color="gray" variant="ghost" @click="replyInputId = comment.id">Reply</UButton>

            <UDropdown v-if="loggedIn" :items="items">
                <UButton size="xs" variant="ghost" color="gray" trailing-icon="i-ph-caret-down" />

                <template #item="{ item }">
                    <span class="truncate">{{ item.label }}</span>

                    <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                </template>

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
        <CommentChild 
            :comment="child"
        />
    </li>
</ul>

</div>

</template>

<script setup>
const { $event } = useNuxtApp()

const { user, loggedIn } = useUserSession()

const props = defineProps({
    comment: {
        type: Object
    }
})

const replyInputId = ref(null)
const replyText = ref()

const emit = defineEmits(['comment', 'like', 'dislike', 'delete', 'edit'])

const addReply = (id) => {

    const commentPayload =   {
        text: replyText.value,
        parentId: id,
    }

    $event('comment', commentPayload)

    replyInputId.value = null
    replyText.value = null
}

const guest = useCookie('guest')

guest.value = guest.value || Math.random().toString(36).slice(2, 14)

const addLike = async (comment) => $event('addLike', comment)

const removeLike = async (comment) => $event('removeLike', comment)



const deleteComment = async (comment) => {

    like = comment.likes.find(e=>e.userId == user.id)
    emit('delete', {
        comment: comment,
        like: like
    })
}

const items = [
    [{
    label: 'Edit',
    icon: 'i-ph-pencil'
  }], [{
    label: 'Delete',
    icon: 'i-ph-trash',
  }]
]

</script>