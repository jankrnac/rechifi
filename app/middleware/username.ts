export default defineNuxtRouteMiddleware((to, from) => {

	const { user } = useUserSession()
	
    if (user.value.username == user.value.email) {
		return navigateTo('/username')
    }

})