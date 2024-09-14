export default eventHandler(async (event) => {

    const code = getRouterParam(event, 'code')

    let token = await useDrizzle().update(tables.tokens).set({
        activatedAt: new Date().toISOString()
    }).where(eq(tables.tokens.value, code)).returning().get()

    return token
})