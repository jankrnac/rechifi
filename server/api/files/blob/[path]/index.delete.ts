export default eventHandler(async (event) => {
    
    await requireUserSession(event)

    
    const { path } = getRouterParams(event)
  
    await hubBlob().del(path)
  
    return sendNoContent(event)
})