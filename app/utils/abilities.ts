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


export const createProduct = defineAbility((user) => {
    return user.id === 1
})

export const editProduct = defineAbility((user) => {
    return user.id === 1
})

export const createHero = defineAbility((user) => {
    return user.id === 1
})