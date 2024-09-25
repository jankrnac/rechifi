export default eventHandler(async (event) => {
    const { path } = getRouterParams(event)
  
    await hubBlob().del(path)
  
    return sendNoContent(event)
})