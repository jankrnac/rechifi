<template>
    <div class="mt-24">
        <ul class="mb-12 flex flex-col gap-3">
            <li v-for="comment in comments">
                <div class="flex w-full">
                    <div class="mr-2"><IconsUser class="w-6 h-6" /></div>
                    <div class="flex-grow">
                        <div class="text-sm font-semibold text-gray-700 mb-1">{{ comment.profiles.username }}</div>
                        <div class="text-sm">{{ comment.text }}</div>
                        <div class="flex gap-2 mt-2 items-center mb-2">
                            <div class="inline-flex items-center text-gray-500 hover:bg-gray-200 cursor-pointer px-1 py-0.5 rounded -ml-1">
                                <IconsHeart class="w-4 h-4 mr-1" />
                                <div class="text-sm">0</div>
                            </div>
                            <div class="text-sm text-gray-700 inline-block cursor-pointer" @click="replyInputId = comment.id">Reply</div>
                            <div class="cursor-pointer"><IconsDots class="w-5 h-5 ml-2" /></div>
                        </div>

                        <div v-if="replyInputId == comment.id" class="ml-0">
                            <textarea class="w-full max-w-[800px] border border-gray-300 rounded-lg focus:outline-none p-4" rows="4" v-model="replyText"></textarea>
                            <div class="flex gap-2 justify-end max-w-[800px]">
                                <Button color="red">Cancel</Button>
                                <Button color="blue" @click="addReply(comment.id)">Reply</Button>
                            </div>
                        </div>
                    </div>
                    </div>
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

const { data:profile } = useFetch('/api/users/' + user.value.id)

const { data:comments } = await useAsyncData('comments', async () => {
    const { data } = await client.from('comments').select('*, profiles(*)')

    return data
})

const text = ref()

const addComment = async () => {

    const comment =   {
        text: text.value,
        profile_id: user.value.id
    }

    await client.from('comments').insert(comment)

    comments.value.push(comment)
}

const replyInputId = ref(null)
const replyText = ref()

const addReply = async (id) => {

    const comment =   {
        text: replyText.value,
        profile_id: user.value.id,
        parent_id: id
    }

    await client.from('comments').insert(comment)

    comments.value.push(comment)
}

</script>