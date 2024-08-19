export default defineNuxtRouteMiddleware((to, from) => {

    const user = {
        id: 1,
        username: 'JanKrnac'
    }
	
    if (!user.value) {
		  return navigateTo('/login')
    }

})