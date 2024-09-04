export default eventHandler(async (event) => {

    const body = await readBody(event)

    const element = await useDrizzle().insert(tables.elements).values(body)
    
    return element
})