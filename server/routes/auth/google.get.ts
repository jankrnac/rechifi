import bcryptjs from "bcryptjs";

export default oauthGoogleEventHandler({
    config: {
        redirectURL: process.env.NUXT_BASE_URL + '/auth/google'
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
            const password = Math.random().toString(36).slice(2, 14)

            const hashedPassword = await bcryptjs.hash(password, 10); // Hash password

            const newUser = await useDrizzle().insert(tables.users).values({
                email: user.email,
                password: hashedPassword,
                name: user.name,
                username: user.email,
                activated: 1
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