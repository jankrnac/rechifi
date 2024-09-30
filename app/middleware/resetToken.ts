export default defineNuxtRouteMiddleware(async (to) => {

    const token = $fetch('/api/tokens/' + to.query.token)

    if (!token) {
      throw createError({ statusCode: 404, statusMessage: 'Token not found' })
    }
  })