export default eventHandler(async (event) => {
    await requireUserSession(event)

    const body = await readBody(event)

    const file = await useDrizzle().insert(tables.files).values({
        filename: body.filename,
        type: 'image'
    }).returning().get()
    
    return file
})