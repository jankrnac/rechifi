<template>

<div>

<div class="flex w-full mt-2 items-start">
    <div class="mr-2 bg-white relative z-[55] text-gray-500">
        <IconsUser class="w-6 h-6" />
    </div>
    <div class="flex-grow">
        <div class="text-xs font-semibold text-gray-700 mb-1 bg-white relative z-[99]">{{ comment.user.username }}</div>
        <div class="text-sm bg-white">{{ comment.text }}</div>
        <div class="flex gap-2 mt-2 items-center mb-2">
            <div class="inline-flex items-center hover:bg-gray-200 cursor-pointer px-1 py-0.5 rounded -ml-1" @click="like(comment)">
                <IconsHeartFull v-if="comment.likes.map(e=>e.profile_id).includes(user.id)" class="w-4 h-4 mr-1 text-red-500"/>
                <IconsHeart v-else class="w-4 h-4 mr-1"/>
                <div class="text-sm">{{ comment.likes.length }}</div>
            </div>
            <div class="text-sm text-gray-700 inline-block cursor-pointer" @click="replyInputId = comment.id">Reply</div>
            <div class="cursor-pointer">
                <Menu as="div" class="relative inline-block text-left">
                    <MenuButton>
                        <IconsDots class="w-5 h-5 ml-2" />
                    </MenuButton>

                    <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                                    >
                        <MenuItems class="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-[999]">
                        <div class="px-1 py-1">

                            <MenuItem v-slot="{ active }">
                                <button :class="[ active ? 'bg-violet-500 text-white' : 'text-gray-900','group flex w-full items-center rounded-md px-2 py-2 text-sm']" @click="editComment(comment)">
                                    <IconsEdit class="mr-2 h-5 w-5" aria-hidden="true" />
                                    Edit
                                </button>
                            </MenuItem>

                            <MenuItem v-slot="{ active }">
                            <button :class="[ active ? 'bg-violet-500 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm' ]" @click="deleteComment(comment)">
                                <IconsCross class="mr-2 h-5 w-5 text-red-500" aria-hidden="true" />
                                Delete
                            </button>
                            </MenuItem>
                        </div>
                        </MenuItems>
                    </transition>
                    </Menu>
                </div>
            </div>

        <div v-if="replyInputId == comment.id" class="ml-0">
            <textarea class="w-full max-w-[800px] border border-gray-300 rounded-lg focus:outline-none p-4" rows="4" v-model="replyText"></textarea>
            <div class="flex gap-2 justify-end max-w-[800px]">
                <UButton color="red">Cancel</UButton>
                <UButton color="blue" @click="addReply(comment.id)">Reply</UButton>
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

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

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

    if (comment.likes.map(e => e.profile_id).includes(user.value.id))
    {
        user ? like['profile_id'] = user.value.id : guest.value

        await client.from('likes').delete().eq('comment_id', comment.id).eq('profile_id', user.value.id)

        emit('dislike', {
            comment: comment,
            like: comment.likes.find(e => e.profile_id == user.value.id)
        })
    }
    else
    {
        const like =   {
            comment_id: comment.id,
        }

        user ? like['profile_id'] = user.value.id : guest.value

        await client.from('likes').insert(like)

        emit('like', {
            comment: comment,
            like: like
        })
    }

}

const deleteComment = async (comment) => {
    await client.from('comments').delete().eq('id', comment.id)

    emit('delete', comment)
}

</script>