export default defineNuxtRouteMiddleware((to, from) => {

	const { loggedIn, user } = useUserSession()
	
    if (!loggedIn || !user.value) {
		return navigateTo('/login')
    }

})