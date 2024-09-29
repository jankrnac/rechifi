export default oauthGoogleEventHandler({
    config: {
        redirectURL: 'http://localhost:3003/auth/google'
    },
    
    async onSuccess(event, { user }) {

        let dbUser = await useDrizzle().query.users.findFirst({
            where: eq(tables.users.email, user.email),
            with: {
                avatar: true
            }
        })
        
        if (!dbUser)
        {
            const newUser = await useDrizzle().insert(tables.users).values({
                email: user.email,
                name: user.name,
                username: user.email,
            }).returning().get()

            await setUserSession(event, {
                user: {
                    id: newUser.id,
                    username: user.email,
                },
            })

        }
        else
        {
            await setUserSession(event, {
                user: {
                    id: dbUser.id,
                    name: dbUser.name,
                    avatar: dbUser.avatar,
                    username: dbUser.username,
                },
            })
        }

      	return sendRedirect(event, '/')
    }
	
})