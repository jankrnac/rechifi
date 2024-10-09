export const editPost = defineAbility((user, post) => {
    return user.id === post.value.userId
})

export const addComment = defineAbility(() => true)

export const editComment = defineAbility((user, comment) => {
    return user.id === comment.value.userId
})

export const deleteComment = defineAbility((user, comment) => {
    return user.id === comment.value.userId
})