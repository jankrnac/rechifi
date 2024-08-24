export default defineNuxtRouteMiddleware((to, from) => {

	const { loggedIn, user, clear, fetch } = useUserSession()
	
    if (!loggedIn) {
		  return navigateTo('/login')
    }

})