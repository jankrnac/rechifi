export default defineNuxtRouteMiddleware(async (to, from) => {

	const { loggedIn, user } = useUserSession()
	
    if (!loggedIn || !user.value) {
		  return navigateTo('/login')
    }
	else
	{
		let asset

		if(to.name == "reviews-username-brand-model-edit")
		{
			asset = await $fetch('/api/reviews/'+ to.params.username + '/' + to.params.brand + '/' + to.params.model)
		}
		else
		{
			asset = await $fetch('/api/articles/'+ to.params.slug)

		}

		if (asset.userId != user.value.id)
		{
			return createError({
				statusCode: 404,
				statusMessage: "Unauthorized",
			});
		}
	}

})