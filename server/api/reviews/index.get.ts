export default eventHandler(async (event) => 
{
    const client = await serverSupabaseClient(event)

    const { data } = await client
    .from('reviews')
    .select()
    
    return data
    
})