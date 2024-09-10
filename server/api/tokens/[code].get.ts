export default eventHandler(async (event) => {

    const code = getRouterParam(event, 'code')

    let token = await useDrizzle().query.tokens.findFirst({
        where: and(
            eq(tables.tokens.value, code),
        )
    })

    await useDrizzle().delete(tables.tokens).where(
        eq(tables.tokens.value, code)
    )

    return token
})