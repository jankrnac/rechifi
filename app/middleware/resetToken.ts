export default defineNuxtRouteMiddleware(async (to) => {

    const token = await $fetch('/api/tokens/' + to.query.code)
    console.log(token)
    if (!token) {
      throw createError({ statusCode: 404, statusMessage: 'Token not found' })
    }
  })